package in.bank.nikhil.exception;

public class UserProfileNotFound extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public UserProfileNotFound() {
		
	}
	public UserProfileNotFound(String msg) {
		super(msg);
	}

}
