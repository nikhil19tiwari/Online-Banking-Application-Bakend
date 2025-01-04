package in.bank.nikhil.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.bank.nikhil.model.Account;
import in.bank.nikhil.repo.AccountRepo;
import in.bank.nikhil.service.AccountService;
import jakarta.transaction.Transactional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepo repo;

    @Override
    public List<String> saveAccount(Account form) {
        List<String> response = new ArrayList<>();
        String accountNumber = AccountNumberGenerator.generateAccountNumber();
        form.setAccountNumber(accountNumber);
        form.setAccountBalance(0L);
        form.setStatus("PAUSE");
        repo.save(form);

        response.add(form.getAccountType());
        response.add(accountNumber);
        response.add("0");
        response.add(form.getUserName());
        return response;
    }

    @Override
    public List<String> depositAmount(String email, String accountType, String accountNumber, Long amountToDeposit) {
        Account account = repo.findByAccountNumberAndEmailIdAndAccountType(accountNumber, email, accountType);

        if (account == null) throw new IllegalArgumentException("Account not found!");

        Long updatedBalance = account.getAccountBalance() + amountToDeposit;
        account.setAccountBalance(updatedBalance);
        repo.save(account);

        List<String> response = new ArrayList<>();
        response.add(account.getUserName());
        response.add(updatedBalance.toString());
        response.add(accountType);

        return response;
    }

    @Override
    public List<String> withdrawAmount(String email, String accountType, String accountNumber, Long amount) {
        Account account = repo.findByAccountNumberAndEmailIdAndAccountType(accountNumber, email, accountType);

        if (account == null || account.getAccountBalance() < amount)
            throw new IllegalArgumentException("Insufficient balance!");

        Long updatedBalance = account.getAccountBalance() - amount;
        account.setAccountBalance(updatedBalance);
        repo.save(account);

        List<String> response = new ArrayList<>();
        response.add(updatedBalance.toString());
        response.add(accountType);
        response.add(account.getUserName());
        return response;
    }

    @Override
    public List<String> userDetails(String accountNumber, String accountType) {
        Account account = repo.findByAccountNumberAndAccountType(accountNumber, accountType);
        if (account == null) throw new IllegalArgumentException("Account not found!");

        List<String> response = new ArrayList<>();
        response.add(account.getAccountNumber());
        response.add(account.getAccountType());
        response.add(account.getAadhar());
        response.add(account.getEmailId());
        response.add(account.getAddress());
        response.add(account.getGender());
        response.add(account.getFirstName());
        response.add(account.getLastName());
        response.add(account.getUserName());
        response.add(account.getAccountBalance().toString());
        return response;
    }

    @Transactional
    public List<String> transferToOtherAccount(String senderAccountType, String senderUserName, Long amount, String receiverAccountNumber) {
        Account sender = repo.findByAccountTypeAndUserName(senderAccountType, senderUserName);
        Account receiver = repo.findByAccountNumber(receiverAccountNumber);

        if (sender == null || receiver == null) {
            throw new IllegalArgumentException("Invalid account details!");
        }

        if (sender.getAccountBalance() < amount) {
            throw new IllegalArgumentException("Insufficient balance!");
        }

        sender.setAccountBalance(sender.getAccountBalance() - amount);
        receiver.setAccountBalance(receiver.getAccountBalance() + amount);

        repo.save(sender);
        repo.save(receiver);

        List<String> response = new ArrayList<>();
        response.add(sender.getAccountBalance().toString());
        response.add(senderUserName);
        response.add(senderAccountType); // Fixed to include correct index (2)
        return response;
    }

    @Override
    public List<Account> findAllCurrentAccounts(String accountType) {
        return repo.findByAccountType(accountType);
    }

    @Override
    public List<Account> findAllSavingAccounts(String accountType) {
        return repo.findByAccountType(accountType);
    }

    @Override
    public boolean existsByEmailIdAndAccountType(String email, String accountType) {
        return repo.existsByEmailIdAndAccountType(email, accountType);
    }

	@Override
	public List<Account> findAllCurrentAccountsStatus(String accountType, String status) {
		
		return repo.findByAccountTypeAndStatus(accountType, status);
	}

	@Override
	public List<Account> findAllSavingAccountsStatus(String accountType, String status) {
		
		return repo.findByAccountTypeAndStatus(accountType, status);
	}

	@Override
	public Account findByAccount(String accountNumber) {
		return  repo.findByAccountNumber(accountNumber);

	    
	}


	@Override

	public void rejectByAccountNumber(String accountNumber) {
	    repo.deleteByAccountNumber(accountNumber);
	    System.out.println("Account rejected and deleted for Account Number: " + accountNumber);
	}

	@Override
	public void saveAccountyByAdmin(Account account) {
		repo.save(account);
		
	}

}
