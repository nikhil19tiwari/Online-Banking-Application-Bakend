package in.bank.nikhil.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import in.bank.nikhil.model.AdminLogin;

public interface AdminRepo extends JpaRepository<AdminLogin, Integer> {
	AdminLogin findByEmailAndPassword(String email, String password);
	AdminLogin findByOtp(String otp);

}
