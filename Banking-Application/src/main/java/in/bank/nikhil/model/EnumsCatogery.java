package in.bank.nikhil.model;

public class EnumsCatogery {

    public enum AccountType {
        SAVINGS, CURRENT, FIXED_DEPOSIT
    }

    public enum Roles {
        USER, ADMIN
    }

    public enum AccountStatus {
        ACTIVE, CLOSE, INACTIVE, BLOCK
    }

    public enum TransactionType {
        CREDIT, DEBIT, TRANSFER
    }
}
