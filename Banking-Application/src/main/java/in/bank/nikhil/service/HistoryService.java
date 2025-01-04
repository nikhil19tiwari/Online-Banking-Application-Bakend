package in.bank.nikhil.service;

import java.util.List;

import in.bank.nikhil.model.CurrentAccount;
import in.bank.nikhil.model.SavingAccount;
import in.bank.nikhil.model.Transfer;

public interface HistoryService {

	public void saveCurrent(CurrentAccount currentAccount);
	public void saveSaving(SavingAccount savingAccount);
	public void saveTransfer(Transfer transfer);
	public List<CurrentAccount> findAllCurrentAccountData();
	public List<SavingAccount> findAllSavinigAccountData();
	public List<Transfer> findAllTransferAccountData();
	
}
