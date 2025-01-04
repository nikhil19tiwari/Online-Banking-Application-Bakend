package in.bank.nikhil.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.bank.nikhil.model.CurrentAccount;
import in.bank.nikhil.model.SavingAccount;

@Repository
public interface SavingRepo extends JpaRepository<SavingAccount, Integer> {
	// Get all records present in the database
    Page<SavingAccount> findByAccountTypeContaining(String accountType, Pageable pageable);
}
