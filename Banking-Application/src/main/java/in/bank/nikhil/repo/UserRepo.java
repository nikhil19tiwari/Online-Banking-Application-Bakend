package in.bank.nikhil.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.bank.nikhil.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
	    public User findByUserName(String UserName);
		
		public User findByEmailAndPhoneAndUserName(String email,String phone,String userName);
		
		public User findByEmail(String email);
		
		public List<User> findAll();

		public boolean existsByUserName(String UserName);
		public boolean existsByEmail(String email);
		public boolean existsByPhone(String phone);
		public boolean existsByEmailAndPassword(String email,String password);
}
