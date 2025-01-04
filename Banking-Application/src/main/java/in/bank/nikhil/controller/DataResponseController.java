package in.bank.nikhil.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import in.bank.nikhil.model.CurrentAccount;
import in.bank.nikhil.model.SavingAccount;
import in.bank.nikhil.repo.CurrentRepo;
import in.bank.nikhil.repo.SavingRepo;
import in.bank.nikhil.repo.TransaferRepo;

@RestController
@RequestMapping("/v1/api/dataResponse")
@CrossOrigin(origins = "http://localhost:5173") // Allow CORS for React frontend
public class DataResponseController {

    @Autowired
    private CurrentRepo currentRepo;

    @Autowired
    private SavingRepo savingRepo;


    // Paginate and sort data with 5 records per page
    @GetMapping("/getData")
    public Page<?> getPaginatedData(
            @RequestParam(defaultValue = "current") String accountType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortOrder) {

        // Define sort order
        Sort sort = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(page, 5, sort);

        // Fetch data based on accountType
        if (accountType.equalsIgnoreCase("current")) {
            return currentRepo.findByAccountTypeContaining(accountType, pageable);
        } else if (accountType.equalsIgnoreCase("saving")) {
            return savingRepo.findByAccountTypeContaining(accountType, pageable);
        } 

        else {
            throw new IllegalArgumentException("Invalid account type. Use 'current' or 'saving'.");
        }
    }
}
