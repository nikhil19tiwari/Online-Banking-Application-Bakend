package in.bank.nikhil.utility;

public class UserDetails {
	private String accountNumber;
	private String accountType;
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getAccountType() {
		return accountType;
	}
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	@Override
	public String toString() {
		return "UserDetails [accountNumber=" + accountNumber + ", accountType=" + accountType + "]";
	}
	
}
