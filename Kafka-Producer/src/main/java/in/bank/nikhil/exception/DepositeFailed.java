package in.bank.nikhil.exception;

public class DepositeFailed extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public DepositeFailed() {
		
	}
	public DepositeFailed(String msg) {
		super(msg);
	}
}
