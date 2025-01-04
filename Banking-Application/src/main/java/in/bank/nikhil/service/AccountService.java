package in.bank.nikhil.service;

import java.util.List;
import in.bank.nikhil.model.Account;

public interface AccountService {
    List<String> saveAccount(Account form);

    List<String> depositAmount(String email, String accountType, String accountNumber, Long amountToDeposit);

    List<String> withdrawAmount(String email, String accountType, String accountNumber, Long amount);

    List<String> userDetails(String accountNumber, String accountType);

    List<String> transferToOtherAccount(String senderAccountType, String senderUserName, Long amount, String receiverAccountNumber);

    List<Account> findAllCurrentAccounts(String accountType);

    List<Account> findAllSavingAccounts(String accountType);
    
    Account findByAccount(String AccountNumber);
    
    void saveAccountyByAdmin(Account account);
    
    void rejectByAccountNumber(String AccountNumber);

    List<Account> findAllCurrentAccountsStatus(String accountType,String status);

    List<Account> findAllSavingAccountsStatus(String accountType,String status);
    
    boolean existsByEmailIdAndAccountType(String email, String accountType);
}