package in.bank.nikhil.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// Preparing The Exception
@RestControllerAdvice
public class AccountResponse {

	// This exception throw Alraeady account is exist
	@ExceptionHandler(value =AccountAlreadyExist.class)
	public ResponseEntity<Error> AlreadyExistAccount(
			                                AccountAlreadyExist a
			                                      ){
		Error error = new Error();
		error.setCode("400=>Already exist Account");
		error.setDate(new Date().toString());
		error.setMessage(a.getMessage());
		return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	//This exception throw Deposite not happned
	@ExceptionHandler(value=DepositeFailed.class)
	public ResponseEntity<Error> DepositeNotHappend(
			                                     DepositeFailed d
			                                              ){
		Error error = new Error();
		error.setCode("500=>Deposite Not Happned");
		error.setDate(new Date().toString());
		error.setMessage(d.getMessage());
		return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	// this exception throw withdrawl not happned
	@ExceptionHandler(value=WithdrawNotHappened.class)
	public ResponseEntity<Error>WithdrawFailed(
			WithdrawNotHappened w
			                                    ){
		Error error = new Error();
		
		error.setCode("500=>withdrawl Not Happned");
		error.setDate(new Date().toString());
		error.setMessage(w.getMessage());
		return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	// this exception throw user profile not found
	@ExceptionHandler(value=UserProfileNotFound.class)
	public ResponseEntity<Error> UserProfileError(
			                        UserProfileNotFound u
			                                     ){
		Error error = new Error();
		error.setCode("500=>Internal server error");
		error.setDate(new Date().toString());
		error.setMessage(u.getMessage());
		return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	// this exception throw tarnfer not happned
	@ExceptionHandler(value=TranferNotHappned.class)
	public ResponseEntity<Error> NotHappnedTransfer(
			                     TranferNotHappned t       
			                                    ){
		Error error = new Error();
		error.setCode("500=>Internal server error");
		error.setDate(new Date().toString());
		error.setMessage(t.getMessage());
		return new ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
