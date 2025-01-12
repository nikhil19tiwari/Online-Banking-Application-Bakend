import React, { useState, useEffect } from "react";
import { getTransactionData } from "../services/user-service";

function Pagination() {
  const [data, setData] = useState([]);
  const [accountType, setAccountType] = useState("current");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch data whenever accountType, page, sortField, or sortOrder changes
  useEffect(() => {
    fetchData();
  }, [accountType, page, sortField, sortOrder]);

  const fetchData = async () => {
    try {
      const params = { accountType, page, sortField, sortOrder };
      const result = await getTransactionData(params);
      setData(result.content);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching paginated data:", error);
    }
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
    setPage(0);
  };

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSubmit = () => {
    setPage(0);
    fetchData();
  };

  const nextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Account Data History</h1>

      {/* Filters Section */}
      <div style={styles.filters}>
        <div style={styles.filterItem}>
          <label htmlFor="accountType" style={styles.label}>
            Select Account Type:
          </label>
          <select
            id="accountType"
            value={accountType}
            onChange={handleAccountTypeChange}
            style={styles.select}
          >
            <option value="current">Current</option>
            <option value="saving">Saving</option>
          </select>
        </div>

        <div style={styles.filterItem}>
          <label htmlFor="sortField" style={styles.label}>
            Sort By:
          </label>
          <select
            id="sortField"
            value={sortField}
            onChange={handleSortFieldChange}
            style={styles.select}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="amount">Amount</option>
            <option value="status">Status</option>
            <option value="transactionType">Transaction Type</option>
          </select>

          <label htmlFor="sortOrder" style={styles.label}>
            Order:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortOrderChange}
            style={styles.select}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <button onClick={handleSubmit} style={styles.submitButton}>
          Submit
        </button>
      </div>

      {/* Data Table */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>ID</th>
            <th style={styles.tableCell}>Name</th>
            <th style={styles.tableCell}>Type</th>
            <th style={styles.tableCell}>Amount</th>
            <th style={styles.tableCell}>Status</th>
            <th style={styles.tableCell}>Transaction Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{item.id}</td>
              <td style={styles.tableCell}>{item.name}</td>
              <td style={styles.tableCell}>{item.accountType}</td>
              <td style={styles.tableCell}>₹{item.amount}</td>
              <td style={styles.tableCell}>{item.status}</td>
              <td style={styles.tableCell}>{item.transactionType}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Buttons */}
      <div style={styles.pagination}>
        <button
          onClick={prevPage}
          disabled={page === 0}
          style={page === 0 ? styles.disabledButton : styles.pageButton}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={page === totalPages - 1}
          style={page === totalPages - 1 ? styles.disabledButton : styles.pageButton}
        >
          Next
        </button>
      </div>

      {/* Page Info */}
      <p style={styles.pageInfo}>
        Page {page + 1} of {totalPages}
      </p>
    </div>
  );
}

// Styles for dynamic and improved UI
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "auto",
    backgroundColor: "#f4f4f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#4CAF50",
    marginBottom: "20px",
    fontSize: "24px",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    gap: "15px",
  },
  filterItem: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    alignSelf: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  tableHeader: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  tableCell: {
    padding: "12px",
    border: "1px solid #ddd",
    textAlign: "center",
  },
  tableRow: {
    transition: "background-color 0.3s",
  },
  tableRowHover: {
    backgroundColor: "#f9f9f9",
  },
  pagination: {
    marginTop: "20px",
    textAlign: "center",
  },
  pageButton: {
    padding: "10px 20px",
    marginRight: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  disabledButton: {
    padding: "10px 20px",
    marginRight: "10px",
    backgroundColor: "#ddd",
    color: "#aaa",
    border: "none",
    cursor: "not-allowed",
    borderRadius: "5px",
  },
  pageInfo: {
    marginTop: "10px",
    textAlign: "center",
    fontSize: "16px",
    color: "#333",
  },
};

export default Pagination;
