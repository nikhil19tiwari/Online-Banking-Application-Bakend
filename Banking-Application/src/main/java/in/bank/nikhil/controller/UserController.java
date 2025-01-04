package in.bank.nikhil.controller;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.bank.nikhil.EmailService.EmailService;
import in.bank.nikhil.model.User;
import in.bank.nikhil.repo.AdminRepo;
import in.bank.nikhil.service.UserService;
import in.bank.nikhil.model.AdminLogin;
import in.bank.nikhil.utility.UserLogin;

@RestController
@RequestMapping("/v1/api/user")
@CrossOrigin(origins = "http://localhost:5173") // Allow CORS for this specific endpoint
public class UserController {

	@Autowired
	private UserService service;
	
	 @Autowired
	    private EmailService emailService;
	    
	 @Autowired 
	 private AdminRepo adminRepo;
	 String currentOtp = "";
	
	@PostMapping("/save")
	public ResponseEntity<String> Signup(
			                       @RequestBody User user
			                          ){
		
		 service.createUser(user);
		 return new ResponseEntity<>("user's signup successfully",HttpStatus.CREATED);
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(
			                       @RequestBody UserLogin login
			                           ){
		boolean flag = service.checkLoginExist(login.getEmail(), login.getPassword());
		if(flag) {
			return new ResponseEntity<>("yes",HttpStatus.OK);
		}
		return new ResponseEntity<>("no",HttpStatus.OK);
	}
	


		 @PostMapping("/adminLogin")
		 public ResponseEntity<String> adminLoginCheck(
		         @RequestBody AdminLogin admin
		 ) {
		     // Validate admin credentials (if required)
		     String email = admin.getEmail();
		     String password = admin.getPassword();

		     // For now, assume any admin login attempt sends OTP (can add validations here)
		     if (email == null || email.isEmpty()) {
		         return new ResponseEntity<>("Email cannot be null or empty", HttpStatus.BAD_REQUEST);
		     }

		     // Generate 4-digit OTP
		     Random random = new Random();
		     currentOtp = String.format("%04d", random.nextInt(10000)); // Generate 4-digit OTP
		     System.out.println("Generated OTP: " + currentOtp); // Log for testing purposes

		     // Send OTP to admin's email
		     try {
		         emailService.sendEmail(
		                 email,
		                 "Admin Access Request - OTP Verification",
		                 "Hello! You are requesting admin access. Your OTP is: " + currentOtp
		         );
		         // create the adminlogin object
		         AdminLogin login = adminRepo.findByEmailAndPassword(email, password);
		         if(email.equals(login.getEmail()) && admin.getUsername().equals(login.getUsername()) && password.equals(login.getPassword())) {
		        	 login.setOtp(currentOtp);
			         adminRepo.save(login);
			         return new ResponseEntity<>("success", HttpStatus.OK);
		         }
		         return new ResponseEntity<>("fail", HttpStatus.OK);
		     } catch (Exception e) {
		         e.printStackTrace();
		         return new ResponseEntity<>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
		     }
		 }
		 
		 @PostMapping("/checkValid") 
		 public ResponseEntity<String> checkValidOtp(@RequestParam String otp) {
			 AdminLogin admin = adminRepo.findByOtp(otp);

			 if (admin != null && admin.getOtp().equalsIgnoreCase(otp)) {
			     System.out.println(admin);
			     return new ResponseEntity<>("success", HttpStatus.OK);
			 }
			 return new ResponseEntity<>("fail", HttpStatus.OK);

		 }

	}

