package in.bank.nikhil.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.bank.nikhil.model.CurrentAccount;
import in.bank.nikhil.model.SavingAccount;
import in.bank.nikhil.model.Transfer;
import in.bank.nikhil.repo.CurrentRepo;
import in.bank.nikhil.repo.SavingRepo;
import in.bank.nikhil.repo.TransaferRepo;
import in.bank.nikhil.service.HistoryService;

@Service
public class HistoryServiceImpl implements HistoryService {

	// Autowire the Current Repository
	@Autowired
	private CurrentRepo cRepo;
	
	//Autowire the Saving Repository
	@Autowired
	private SavingRepo  sRepo;
	
	//Autowire the Transfer Repository
	@Autowired
	private TransaferRepo tRepo;
	
	@Override
	public void saveCurrent(CurrentAccount currentAccount) {
      cRepo.save(currentAccount);
	}

	@Override
	public void saveSaving(SavingAccount savingAccount) {
		sRepo.save(savingAccount);

	}

	@Override
	public void saveTransfer(Transfer transfer) {
	tRepo.save(transfer);
	}

	@Override
	public List<CurrentAccount> findAllCurrentAccountData() {
		
		return cRepo.findAll();
	}

	@Override
	public List<SavingAccount> findAllSavinigAccountData() {
		
		return sRepo.findAll();
	}

	@Override
	public List<Transfer> findAllTransferAccountData() {

		return tRepo.findAll();
	}

}
