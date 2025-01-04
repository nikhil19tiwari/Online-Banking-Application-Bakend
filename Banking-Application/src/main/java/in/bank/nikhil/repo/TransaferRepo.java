package in.bank.nikhil.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.bank.nikhil.model.CurrentAccount;
import in.bank.nikhil.model.Transfer;

@Repository
public interface TransaferRepo extends JpaRepository<Transfer, Integer> {
	Page<Transfer> findByAccountTypeContaining(String accountType, Pageable pageable);
}
