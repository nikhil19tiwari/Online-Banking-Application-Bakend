package in.bank.nikhil.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import in.bank.nikhil.exception.DepositeFailed;
import in.bank.nikhil.exception.TranferNotHappned;
import in.bank.nikhil.exception.UserProfileNotFound;
import in.bank.nikhil.exception.WithdrawNotHappened;
import in.bank.nikhil.produce.JsonUtil;
import in.bank.nikhil.produce.Producer;
import in.bank.nikhil.utility.Account;
import in.bank.nikhil.utility.AccountType;
import in.bank.nikhil.utility.Transaction;
import in.bank.nikhil.utility.Transfer;
import in.bank.nikhil.utility.UserDetails;

@RestController
@RequestMapping("/v1/api/transaction")
@CrossOrigin(origins = "http://localhost:5173") // Allow CORS for this specific endpoint
public class TransactionController {

    @Autowired
    private Producer producer;

    @Autowired
    private RestTemplate restTemplate;

    /**
     * Endpoint to initiate a deposit transaction with confirmation mechanism.
     * @throws InterruptedException 
     * @throws DepositeFailed 
     */
    
    @PostMapping("/deposit")
    public ResponseEntity<List<String>> depositProducer(@RequestBody Transaction transaction) throws InterruptedException, DepositeFailed{
        if (transaction == null || transaction.getAmount() == null || transaction.getAmount() <= 0) {
           throw new DepositeFailed("Deposite Request is failed!. Please Enter correct credentials");
        }
        // convert the transaction into string
        String depositMessage = JsonUtil.convertTransaction(transaction);
        if (depositMessage == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Send message to Kafka
        producer.sendMessage(depositMessage);

        // Wait for confirmation (simulate synchronous behavior)
        Thread.sleep(2000); // Simulated delay for Kafka processing

        String confirmationUrl = "http://localhost:8686/v1/api/account/depositConfirmation";
        try {
            HttpEntity<Transaction> requestEntity = new HttpEntity<>(transaction);
            // Call the consumer's confirmation endpoint
            ResponseEntity<List<String>> response = restTemplate.exchange(
                    confirmationUrl,
                    HttpMethod.POST,
                    requestEntity,
                    new ParameterizedTypeReference<List<String>>() {}
            );
            if (response.getStatusCode() == HttpStatus.OK) {
                return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    /**
     * Endpoint to initiate a withdrawal transaction with confirmation mechanism.
     * @throws WithdrawNotHappened 
     */
    @PostMapping("/withdraw")
    public ResponseEntity<List<String>> withdrawProducer(@RequestBody Transaction transaction) throws InterruptedException, WithdrawNotHappened {
        if (transaction == null || transaction.getAmount() == null || transaction.getAmount() <= 0) {
           throw new WithdrawNotHappened("withdraw Request is failed!. Please Enter correct credentials");
           
        }
        // convert tarnsaction into string
        String withdrawMessage = JsonUtil.convertTransaction(transaction);
        if (withdrawMessage == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Send message to Kafka
        producer.sendWithDrawMessage(withdrawMessage);
        System.out.println("Withdraw transaction message sent to Kafka: " + withdrawMessage);

        // Wait for confirmation
        Thread.sleep(2000);

        String confirmationUrl = "http://localhost:8686/v1/api/account/withdrawConfirmation";

        try {
            HttpEntity<Transaction> requestEntity = new HttpEntity<>(transaction);
            // Call the consumer's confirmation endpoint
            ResponseEntity<List<String>> response = restTemplate.exchange(
                    confirmationUrl,
                    HttpMethod.POST,
                    requestEntity,
                    new ParameterizedTypeReference<List<String>>() {}
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                System.out.println("Withdraw transaction confirmed successfully.");
                return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
            } else {
                System.out.println("Withdraw transaction confirmation failed with status: " + response.getStatusCode());
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            System.out.println("Withdraw transaction confirmation failed: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    /**
     * Endpoint to initiate a transfer transaction with confirmation mechanism.
     * @throws TranferNotHappned 
     */
    @PostMapping("/transfer")
    public ResponseEntity<List<String>> transferProducer(@RequestBody Transfer transfer) throws TranferNotHappned {
       
    	if (transfer == null || transfer.getAmount() <= 0 || transfer.getReceiverAccountNumber() == null) {
            throw new TranferNotHappned("Transfer Request failed! Please provide correct credentials.");
        }

        String transferMessage = JsonUtil.convertTransfer(transfer);
        if (transferMessage == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            // Send message to Kafka
            producer.sendTransferData(transferMessage);

            // Wait for confirmation
            Thread.sleep(2000);

            String confirmationUrl = "http://localhost:8686/v1/api/account/transferConfirmation";
            HttpEntity<Transfer> requestEntity = new HttpEntity<>(transfer);
            ResponseEntity<List<String>> response = restTemplate.exchange(
                    confirmationUrl,
                    HttpMethod.POST,
                    requestEntity,
                    new ParameterizedTypeReference<List<String>>() {}
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    
   @PostMapping("/userDetails")
   public ResponseEntity<List<String>> GetUserDetrails(@RequestBody UserDetails details) throws InterruptedException, UserProfileNotFound {
	      if (details == null ||details.getAccountNumber() == null|| details.getAccountType() == null) {
	            throw new UserProfileNotFound("You Entered Incorrect user credentials !!");
	        }

	        String transferMessage = JsonUtil.convertUserDetails(details);
	        if (transferMessage == null) {
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }
	// convert tarnsaction into string
       String userDetails= JsonUtil.convertUserDetails(details);
       // Send message to Kafka
       producer.sendUserProfileData(userDetails);
       
    // Wait for confirmation
       Thread.sleep(2000);

       String confirmationUrl = "http://localhost:8686/v1/api/account/details";
       try {
           HttpEntity<UserDetails> requestEntity = new HttpEntity<>(details);
           // Call the consumer's confirmation endpoint
           ResponseEntity<List<String>> response = restTemplate.exchange(
                   confirmationUrl,
                   HttpMethod.POST,
                   requestEntity,
                   new ParameterizedTypeReference<List<String>>() {}
           );
           if (response.getStatusCode() == HttpStatus.OK) {
               return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
           } else {
               return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
           }
       } catch (Exception e) {
           e.printStackTrace();
           return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
       }
       
   }
   @PostMapping("/currentData")
   public ResponseEntity<List<Account>> GetCurrentAccountDetails(@RequestBody AccountType type) throws InterruptedException, UserProfileNotFound {
	      if (type == null) {
	            throw new UserProfileNotFound("You Entered Incorrect user credentials !!");
	        }

	        String currentRecord = JsonUtil.convertToCurrentData(type);
	        if (currentRecord == null) {
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }
	// convert tarnsaction into string
       String userDetails= JsonUtil.convertToCurrentData(type);
       // Send message to Kafka
       producer.sendCurrentData(userDetails);
       
    // Wait for confirmation
       Thread.sleep(2000);

       String confirmationUrl = "http://localhost:8686/v1/api/account/currentData";
       try {
           HttpEntity<AccountType> requestEntity = new HttpEntity<>(type);
           // Call the consumer's confirmation endpoint
           ResponseEntity<List<Account>> response = restTemplate.exchange(
                   confirmationUrl,
                   HttpMethod.POST,
                   requestEntity,
                   new ParameterizedTypeReference<List<Account>>() {}
           );
           if (response.getStatusCode() == HttpStatus.OK) {
               return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
           } else {
               return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
           }
       } catch (Exception e) {
           e.printStackTrace();
           return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
       }
       
   }
   
   @PostMapping("/SavingData")
   public ResponseEntity<List<Account>> GetSavingAccountDetails(@RequestBody AccountType type) throws InterruptedException, UserProfileNotFound {
	      if (type == null) {
	            throw new UserProfileNotFound("You Entered Incorrect user credentials !!");
	        }

	      //convert into string type
	        String currentRecord = JsonUtil.convertToCurrentData(type);
	        
	        if (currentRecord == null) {
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }
	// convert tarnsaction into string
       String userDetails= JsonUtil.convertToSavingData(type);
       
       // Send message to Kafka
       producer.sendSavingData(userDetails);
       
    // Wait for confirmation
       Thread.sleep(2000);

       String confirmationUrl = "http://localhost:8686/v1/api/account/savingData";
       try {
           HttpEntity<AccountType> requestEntity = new HttpEntity<>(type);
           // Call the consumer's confirmation endpoint
           ResponseEntity<List<Account>> response = restTemplate.exchange(
                   confirmationUrl,
                   HttpMethod.POST,
                   requestEntity,
					new ParameterizedTypeReference<List<Account>>() {
					}
           );
           if (response.getStatusCode() == HttpStatus.OK) {
               return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
           } else {
               return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
           }
       } catch (Exception e) {
           e.printStackTrace();
           return new ResponseEntity<>(HttpStatus.SERVICE_UNAVAILABLE);
       }
       
   }
}
