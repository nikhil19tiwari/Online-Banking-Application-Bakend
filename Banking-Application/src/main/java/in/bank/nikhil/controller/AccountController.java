package in.bank.nikhil.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.web.bind.annotation.*;

import in.bank.nikhil.service.AccountService;
import in.bank.nikhil.EmailService.EmailService;
import in.bank.nikhil.consumer.JsonUtil;
import in.bank.nikhil.exception.AccountAlreadyExist;
import in.bank.nikhil.model.Account;
import in.bank.nikhil.utility.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/v1/api/account")
@CrossOrigin(origins = "http://localhost:5173") // Allow CORS for this specific endpoint
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private EmailService emailService;
    
    @Autowired
    DataStoreController dataStore;

    private List<String> bodyOfDeposit = new ArrayList<>();
    private List<String> bodyOfWithdraw = new ArrayList<>();
    private List<String> bodyOfTransferData = new ArrayList<>();
    private List<String> bodyOfUserProfile = new ArrayList<>();
    private List<Account> bodyOfCurrentAccount = new ArrayList<>();
    private List<Account> bodyOfSavingAccount = new ArrayList<>();

    @PostMapping("/create")
    public List<String> createAccount(@RequestBody Account account) {
        boolean exists = accountService.existsByEmailIdAndAccountType(account.getEmailId(), account.getAccountType());
        if (exists) {
            throw new AccountAlreadyExist("This account already exists");
        }

        List<String> response = accountService.saveAccount(account);
        // Send email asynchronously after saving the account
        emailService.sendEmail(account.getEmailId(),
                "Account Opening Request Successful!",
                "Hello " + account.getUserName() + ", your account has been successfully created and will be fully activated soon.");
        return response;
    }

     // get each customer account details for approving
    @PostMapping("/getCustomer")
    public List<Account> findAllAccountByAccountType(@RequestParam String accountType) {
    	
        if ("Saving".equalsIgnoreCase(accountType)) {
            return accountService.findAllSavingAccountsStatus(accountType,"PAUSE");
        } else if ("Current".equalsIgnoreCase(accountType)) {
            return accountService.findAllSavingAccountsStatus(accountType,"PAUSE");
        } else {
            return Collections.emptyList();  // or return an error
        }
    }


 // Approving or Deleting the Account
    @PostMapping("/approve")
    public ResponseEntity<String> approveOrDeleteAccount(
            @RequestParam String action,
            @RequestParam String accountNumber) {
        try {
            System.out.println("Action received: " + action + ", Account: " + accountNumber);

            Account account = accountService.findByAccount(accountNumber);
            if (account == null) {
                return ResponseEntity.badRequest().body("Account not found!");
            }

            if (action.equalsIgnoreCase("approve")) {
                account.setStatus("ACTIVE");
                accountService.saveAccountyByAdmin(account);
                System.out.println("Account approved: " + accountNumber);
                // give the email notification
                emailService.sendEmail(account.getEmailId(),
                        "Account Opening Request Successful!",
                        "Hello " + account.getUserName() + ", your account has been successfully Aproved . Now you are able to do the tarnsaction");
                return ResponseEntity.ok("Account Activated Successfully!");
            } else if (action.equalsIgnoreCase("reject")) {
                accountService.rejectByAccountNumber(accountNumber);
                System.out.println("Account rejected: " + accountNumber);
                
                emailService.sendEmail(account.getEmailId(),
                        "Account Opening Request Successful!",
                        "Hello " + account.getUserName() + ", your account has NOT been  Aproved !!!");
                // give the email notification
                return ResponseEntity.ok("Account Rejected and Deleted Successfully!");
            } else {
                return ResponseEntity.badRequest().body("Invalid action. Use 'Approve' or 'Reject'.");
            }
        } catch (Exception e) {
            System.err.println("Error processing request: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing the request.");
        }
    }



    
    
    @KafkaListener(topics = "${deposite.topic.name}", groupId = "abcd")
    public void depositAmount(String message) {
        Transaction transaction = JsonUtil.convert(message);
        if (transaction != null) {
            bodyOfDeposit = accountService.depositAmount(
                transaction.getEmail(),
                transaction.getAccountType(),
                transaction.getAccountNumber(),
                transaction.getAmount()
            );
        } else {
            System.out.println("Deposit failed due to invalid credentials.");
        }
    }

    @PostMapping("/depositConfirmation")
    public ResponseEntity<List<String>> depositConfirmation(@RequestBody Transaction transaction) {
        if (transaction == null || transaction.getAccountNumber() == null || transaction.getAmount() <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Check deposit status
        if (bodyOfDeposit != null && !bodyOfDeposit.isEmpty()) {
        	
        	dataStore.depositAmount(bodyOfDeposit);
        	
            return new ResponseEntity<>(bodyOfDeposit, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

   
    @KafkaListener(topics = "${withdraw.topic.name}", groupId = "abcd")
    public void withdrawAmount(String message) {
        System.out.println("Received withdraw message from Kafka: " + message);

        // Convert Kafka message to Transaction object
        Transaction transaction = JsonUtil.convert(message);

            bodyOfWithdraw = accountService.withdrawAmount(
                transaction.getEmail(),
                transaction.getAccountType(),
                transaction.getAccountNumber(),
                transaction.getAmount()
            );

           System.out.println(bodyOfWithdraw);
    }

    @PostMapping("/withdrawConfirmation")
    public ResponseEntity<List<String>> WithdrawConfirmations(@RequestBody Transaction transaction) {
    	
    	// save the record as history
    	dataStore.withDrawResponse(bodyOfWithdraw);
            return new ResponseEntity<>(bodyOfWithdraw, HttpStatus.OK);
    }

    @KafkaListener(topics = "${profile.topic.name}", groupId = "abcd")
    public void fetchUserProfile(String message) {
        UserDetails details = JsonUtil.covertUserDetails(message);
        bodyOfUserProfile = accountService.userDetails(details.getAccountNumber(), details.getAccountType());
    }

    @PostMapping("/details")
    public List<String> getUserProfileData() {
        return bodyOfUserProfile;
    }

    @KafkaListener(topics = "${transfer.topic.name}", groupId = "abcd")
    public void transferMoney(String message) {
        Transfer transfer = JsonUtil.convertTransferData(message);
        bodyOfTransferData = accountService.transferToOtherAccount(
            transfer.getSenderAccountType(),
            transfer.getSenderUserName(),
            transfer.getAmount(),
            transfer.getReceiverAccountNumber()
        );
    }

    @PostMapping("/transferConfirmation")
    public ResponseEntity<List<String>> transferConfirmation(@RequestBody Transfer transfer) {
        if (transfer == null || transfer.getReceiverAccountNumber() == null || transfer.getAmount() <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (bodyOfTransferData != null && !bodyOfTransferData.isEmpty()) {
            try {
                // Save the record to the database
                dataStore.tarnsferDataResponse(bodyOfTransferData);
                return new ResponseEntity<>(bodyOfTransferData, HttpStatus.OK);
            } catch (Exception e) {
                e.printStackTrace();
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @KafkaListener(topics = "${current.topic.name}", groupId = "abcd")
    public void fetchCurrentAccountData(String message) {
        AccountType type = JsonUtil.convertAccountTypeData(message);
        bodyOfCurrentAccount = accountService.findAllCurrentAccounts(type.getAccountType());
    }

    @PostMapping("/currentData")
    public List<Account> getCurrentAccounts() {
        return bodyOfCurrentAccount;
    }

    @KafkaListener(topics = "${saving.topic.name}", groupId = "abcd")
    public void fetchSavingAccountData(String message) {
        AccountType type = JsonUtil.convertAccountTypeData(message);
        bodyOfSavingAccount = accountService.findAllSavingAccounts(type.getAccountType());
    }

    @PostMapping("/savingData")
    public List<Account> getSavingAccounts() {
        return bodyOfSavingAccount;
    }
}
