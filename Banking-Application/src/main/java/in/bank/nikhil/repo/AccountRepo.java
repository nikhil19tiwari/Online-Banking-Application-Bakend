package in.bank.nikhil.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import in.bank.nikhil.model.Account;

import jakarta.transaction.Transactional;

@Repository
public interface AccountRepo extends JpaRepository<Account, Integer> {

    Account findByAccountNumberAndEmailIdAndAccountType(String accountNumber, String emailId, String accountType);

    Account findByAccountNumberAndAccountType(String accountNumber, String accountType);

    Account findByAccountTypeAndUserName(String accountType, String userName);


    Account findByAccountNumber( String accountNumber);


    List<Account> findByAccountType(String AccountType);
   
    List<Account> findByAccountTypeAndStatus(String AccountType,String status);
    
    @Transactional
    void deleteByAccountNumber(String accountNumber);
    
    @Transactional
    @Modifying
    @Query("UPDATE Account a SET a.accountBalance = :amount WHERE a.accountNumber = :accountNumber AND a.emailId = :emailId")
    void updateAmount(String accountNumber, String emailId, Long amount);
    
    boolean existsByEmailIdAndAccountType(String email,String accountType);
	
}
