package in.bank.nikhil.consumer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import in.bank.nikhil.utility.AccountType;
import in.bank.nikhil.utility.Transaction;
import in.bank.nikhil.utility.Transfer;
import in.bank.nikhil.utility.UserDetails;

// Here we are converting  String into  object so that it will be
// easy to save in db
public class JsonUtil {
	// coverting String type to Transaction type
    public static Transaction convert(String message) {
    	//creating the object mapper
        ObjectMapper mapper = new ObjectMapper();
        try {
        	// converting the String into object
            return mapper.readValue(message, Transaction.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
    // converting String type to userdetails type
    public static UserDetails covertUserDetails(String message) {
    	// creating object mapper
    	ObjectMapper mapper = new ObjectMapper();
    	try {
			return mapper.readValue(message, UserDetails.class);
		} catch (JsonProcessingException e) {

			e.printStackTrace();
		}
		return null;
    }
    // converting string type to Tranfer type
    public static Transfer convertTransferData(String message) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            // Convert the message string to a Transfer object
            return mapper.readValue(message, Transfer.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null; // Return null in case of an error
        }
    }

    // converting string type to AccountType type
    public static AccountType convertAccountTypeData(String message) {
        // Creating the object mapper
        ObjectMapper mapper = new ObjectMapper();
        try {
            // Convert the message (String) to an AccountType object and return it
            return mapper.readValue(message, AccountType.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null; // Return null in case of an error
        }
    }

    
    
    
}
