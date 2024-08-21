import React, { useState } from "react";
import "./Form.css";

function Form({ users }) {
  const [searchCnic, setSearchCnic] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // Function to format CNIC
  const formatCnic = (cnic) => {
    const cleanedCnic = cnic.replace(/\D/g, ""); // Remove non-digit characters
    if (cleanedCnic.length <= 5) {
      return cleanedCnic;
    }
    if (cleanedCnic.length <= 12) {
      return cleanedCnic.slice(0, 5) + "-" + cleanedCnic.slice(5);
    }
    return (
      cleanedCnic.slice(0, 5) +
      "-" +
      cleanedCnic.slice(5, 12) +
      "-" +
      cleanedCnic.slice(12, 13)
    );
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedCnic = formatCnic(inputValue);
    setSearchCnic(formattedCnic);
  };

  const handleSearch = () => {
    const cleanedCnic = searchCnic.replace(/-/g, ""); // Remove dashes for searching
    const user = users.find((u) => u.cnic.replace(/-/g, "") === cleanedCnic);
    setSearchResult(user ? user : "No Record Found");
  };

  return (
    <div className="Form">
      <div className="input-button-div">
        <input
          placeholder="Please Enter CNIC NO"
          value={searchCnic}
          onChange={handleChange}
        />
        <button className="srch-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {searchResult && (
        <div className="search-result">
          {typeof searchResult === "string" ? (
            <p>{searchResult}</p>
          ) : (
            <div>
              <p>Name: {searchResult.name}</p>
              <p>Father's Name: {searchResult.fname}</p>
              <p>CNIC: {searchResult.cnic}</p>
              <p>License No: {searchResult.licenseNo}</p>
              <p>License Type: {searchResult.licenseType}</p>
              <p>Expiry Date: {searchResult.expiryDate}</p>
              <p>Issue Date: {searchResult.issueDate}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Form;
