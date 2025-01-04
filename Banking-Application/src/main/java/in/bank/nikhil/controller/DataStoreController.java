package in.bank.nikhil.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import in.bank.nikhil.model.CurrentAccount;
import in.bank.nikhil.model.SavingAccount;
import in.bank.nikhil.model.Transfer;
import in.bank.nikhil.service.HistoryService;


@RestController
@RequestMapping("/v1/api/dataRequest")
@CrossOrigin(origins = "http://localhost:5173") // Allow CORS for this specific endpoint
public class DataStoreController {

    @Autowired
    private HistoryService service;

    @Autowired
    private RestTemplate restTemplate;

	public void depositAmount(List<String>response) {


		// creating the variable to store the response data
		String userName = "";
		String balance = "";
		String accountType = "";
		Long amount = 0L;
		// Null check aur size check kar lein
		if (response != null) {
			// Strings ko alag-alag variables me store karna
			userName = response.get(0); // Pehla string
			balance = response.get(1); // Dusra string
			amount = (long) Integer.parseInt(balance);
			accountType = response.get(2); // Teesra string

			if (accountType.equalsIgnoreCase("current")) {
				// create the current account object
				CurrentAccount current = new CurrentAccount();
				current.setAccountType(accountType);
				current.setAmount(amount);
				current.setName(userName);
				current.setStatus("SUCCESSFULL");
				current.setTransactionType("DEPOSIT");

				// saving the current data in the db
				service.saveCurrent(current);
			} else {
				// create the saving account object
				SavingAccount saving = new SavingAccount();
				saving.setAccountType(accountType);
				saving.setAmount(amount);
				saving.setName(userName);
				saving.setStatus("SUCCESSFULL");
				saving.setTransactionType("DEPOSIT");

				// saving the saving account data into db
				service.saveSaving(saving);
			}
		} else {

			if (accountType.equalsIgnoreCase("current")) {
				// create the current account object
				CurrentAccount current = new CurrentAccount();
				current.setAccountType(accountType);
				current.setAmount(amount);
				current.setName(userName);
				current.setStatus("FAILURE");
				current.setTransactionType("DEPOSIT");

				// saving the current data in the db
				service.saveCurrent(current);
			} else {
				// create the saving account object
				SavingAccount saving = new SavingAccount();
				saving.setAccountType(accountType);
				saving.setAmount(amount);
				saving.setName(userName);
				saving.setStatus("FAILURE");
				saving.setTransactionType("DEPOSIT");

				// saving the saving account data into db
				service.saveSaving(saving);
			}

		}
	}

	public void withDrawResponse(List<String> response) {

		// createting the variable to hold the response data
		String balance = "";
		String accountType = "";
		String userName = "";
		Long amount = 0L;

		// check if the response is not null
		if (response != null) {
			balance = response.get(0);
			accountType = response.get(1);
			userName = response.get(2);
			amount = (long) Integer.parseInt(balance);

			// check if the accountType is current
			if (accountType.equalsIgnoreCase("current")) {
				// create the current-account object
				CurrentAccount current = new CurrentAccount();
				current.setAccountType(accountType);
				current.setAmount(amount);
				current.setName(userName);
				current.setStatus("SUCCESS");
				current.setTransactionType("WITHDRAW");

				// saving the data into database
				service.saveCurrent(current);
			} else {
				// create the saving account object
				SavingAccount saving = new SavingAccount();
				saving.setAccountType(accountType);
				saving.setAmount(amount);
				saving.setName(userName);
				saving.setStatus("SUCCESS");
				saving.setTransactionType("WITHDRAW");

				// saving the data into database
				service.saveSaving(saving);
			}
		} else {
			// check if the accountType is current
			if (accountType.equalsIgnoreCase("current")) {
				// create the current-account object
				CurrentAccount current = new CurrentAccount();
				current.setAccountType(accountType);
				current.setAmount(amount);
				current.setName(userName);
				current.setStatus("FAILURE");
				current.setTransactionType("WITHDRAW");

				// saving the data into database
				service.saveCurrent(current);
			} else {
				// create the saving account object
				SavingAccount saving = new SavingAccount();
				saving.setAccountType(accountType);
				saving.setAmount(amount);
				saving.setName(userName);
				saving.setStatus("FAILURE");
				saving.setTransactionType("WITHDRAW");

				// saving the data into database
				service.saveSaving(saving);
			}
		}
	}
	
	public void tarnsferDataResponse(List<String> response) {
	    if (response == null || response.size() < 3) {
	        throw new IllegalArgumentException("Incomplete transfer response data");
	    }

	    String accountType = response.get(2);
	    String senderName = response.get(1);
	    String balance = response.get(0);
	    Long amount = Long.parseLong(balance);

	    if ("current".equalsIgnoreCase(accountType)) {
	        Transfer current = new Transfer();
	        current.setAccountType(accountType);
	        current.setAmount(amount);
	        current.setSenderName(senderName);
	        current.setStatus("SUCCESSFUL");
	        // Save or process `current`
	        service.saveTransfer(current);
	    } else {
	        Transfer saving = new Transfer();
	        saving.setAccountType(accountType);
	        saving.setAmount(amount);
	        saving.setSenderName(senderName);
	        saving.setStatus("SUCCESSFUL");
	        // Save or process `saving`
	        service.saveTransfer(saving);
	    }
	}

}
