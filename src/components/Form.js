import React, { useState } from "react";
import "./Form.css";

function Form({ users }) {
  const [searchCnic, setSearchCnic] = useState(""); 
  const [searchResult, setSearchResult] = useState(null); 

  const handleSearch = () => {
    const user = users.find((u) => u.cnic === searchCnic);
    setSearchResult(user ? user : "No Record Found");
    setSearchCnic('')
  };

  return (
    <div className="Form">
      <div className="input-button-div">
        <input
          placeholder="Please Enter CNIC NO"
          value={searchCnic}
          type={Number}
          onChange={(e) => setSearchCnic(e.target.value)} 
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
