package in.bank.nikhil.produce;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import in.bank.nikhil.utility.AccountType;
import in.bank.nikhil.utility.Transaction;
import in.bank.nikhil.utility.Transfer;
import in.bank.nikhil.utility.UserDetails;

public class JsonUtil {

    private static final ObjectMapper mapper = new ObjectMapper();

    /**
     * Converts a Transaction object into a JSON string.
     * 
     * @param transaction the Transaction object to be converted
     * @return JSON string or null if conversion fails
     */
    public static String convertTransaction(Transaction transaction) {
        return convertToJson(transaction);
    }

    /**
     * Converts a UserDetails object into a JSON string.
     * 
     * @param details the UserDetails object to be converted
     * @return JSON string or null if conversion fails
     */
    public static String convertUserDetails(UserDetails details) {
        return convertToJson(details);
    }

    /**
     * Converts a Transfer object into a JSON string.
     * 
     * @param transfer the Transfer object to be converted
     * @return JSON string or null if conversion fails
     */
    public static String convertTransfer(Transfer transfer) {
        return convertToJson(transfer);
    }

    /**
     * Converts an AccountType object into a JSON string (for current account data).
     * 
     * @param type the AccountType object to be converted
     * @return JSON string or null if conversion fails
     */
    public static String convertToCurrentData(AccountType type) {
        return convertToJson(type);
    }

    /**
     * Converts an AccountType object into a JSON string (for savings account data).
     * 
     * @param type the AccountType object to be converted
     * @return JSON string or null if conversion fails
     */
    public static String convertToSavingData(AccountType type) {
        return convertToJson(type);
    }

    /**
     * Generic method to convert any object into a JSON string.
     * 
     * @param object the object to be converted
     * @return JSON string or null if conversion fails
     */
    private static String convertToJson(Object object) {
        try {
            return mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
