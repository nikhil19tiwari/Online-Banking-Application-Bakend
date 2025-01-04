package in.bank.nikhil.exception;

public class Error {
private String code;
private String date;
private String message;
@Override
public String toString() {
	return "Error [code=" + code + ", date=" + date + ", message=" + message + "]";
}
public String getCode() {
	return code;
}
public void setCode(String code) {
	this.code = code;
}
public String getDate() {
	return date;
}
public void setDate(String date) {
	this.date = date;
}
public String getMessage() {
	return message;
}
public void setMessage(String message) {
	this.message = message;
}

}
