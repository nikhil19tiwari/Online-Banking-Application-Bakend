package in.bank.nikhil.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.bank.nikhil.model.CurrentAccount;

@Repository
public interface CurrentRepo extends JpaRepository<CurrentAccount, Integer> {
    Page<CurrentAccount> findByAccountTypeContaining(String accountType, Pageable pageable);
}
