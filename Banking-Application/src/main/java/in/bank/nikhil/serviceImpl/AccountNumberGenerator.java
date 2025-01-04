package in.bank.nikhil.serviceImpl;

import java.util.concurrent.ThreadLocalRandom;

public class AccountNumberGenerator {

    public static String generateAccountNumber() {
        // Generate a 12-digit random number
        long accountNumber = ThreadLocalRandom.current().nextLong(1_000_000_000_000L, 9_999_999_999_999L);
        return String.valueOf(accountNumber);
    }
}
