package in.bank.nikhil.exception;

public class AccountAlreadyExist extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public AccountAlreadyExist()
    {
		
	}
	public AccountAlreadyExist(String msg)
    {
	super(msg);	
	}

}
