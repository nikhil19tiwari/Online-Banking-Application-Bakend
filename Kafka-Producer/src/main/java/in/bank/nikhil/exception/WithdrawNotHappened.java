package in.bank.nikhil.exception;

// creating the custom exception handler to throw the exception
//not happend withdrawl
public class WithdrawNotHappened extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public WithdrawNotHappened() {
		
	}
	public WithdrawNotHappened(String msg) {
		super(msg);
	}
}
