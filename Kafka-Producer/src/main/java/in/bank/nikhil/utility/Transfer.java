package in.bank.nikhil.utility;

public class Transfer {
	private String senderAccountType;
	private String senderUserName;
	private Long amount;
	private String receiverAccountNumber;
	public String getSenderAccountType() {
		return senderAccountType;
	}
	public void setSenderAccountType(String senderAccountType) {
		this.senderAccountType = senderAccountType;
	}
	public String getSenderUserName() {
		return senderUserName;
	}
	public void setSenderUserName(String senderUserName) {
		this.senderUserName = senderUserName;
	}
	public Long getAmount() {
		return amount;
	}
	public void setAmount(Long amount) {
		this.amount = amount;
	}
	public String getReceiverAccountNumber() {
		return receiverAccountNumber;
	}
	public void setReceiverAccountNumber(String receiverAccountNumber) {
		this.receiverAccountNumber = receiverAccountNumber;
	}
	@Override
	public String toString() {
		return "Transfer [senderAccountType=" + senderAccountType + ", senderUserName=" + senderUserName + ", amount="
				+ amount + ", receiverAccountNumber=" + receiverAccountNumber + "]";
	}
	
}
