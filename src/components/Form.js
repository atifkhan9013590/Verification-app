import React, { useState, useRef } from "react";
import axios from "axios";
import "./Form.css";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";


function Form() {
  const [searchCnic, setSearchCnic] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [userFound, setUserFound] = useState(false);
  const [loading, setLoading] = useState(false);

  // Ref to the grid element for smooth scrolling
  const gridRef = useRef(null);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

  // Function to format CNIC for display
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
    setSearchCnic(formatCnic(inputValue));
  };

  const handleSearch = async () => {
    if (userFound) {
      setSearchCnic("");
      setSearchResult(null);
      setUserFound(false);
      return;
    }

    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `${apiUrl}/user/search-by-cnic/${searchCnic}`
      );
      setSearchResult(response.data);
      setUserFound(true);

      setLoading(false); // Stop loading
      // Add a delay to allow the grid to render before scrolling
      setTimeout(() => {
        if (gridRef.current) {
          gridRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Adjust delay time if necessary
    } catch (error) {
      toast.error("No Record Found");
      setLoading(false); // Stop loading on error
      setUserFound(false);
      console.error("Failed to search user", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="Form">
      <div className="background-image"></div>
      <div className="overlay"></div>

      <div className="input-button-div">
        <input
          placeholder="Please Enter CNIC NO"
          value={searchCnic}
          onChange={handleChange}
        />
        <button className="srch-btn" onClick={handleSearch} disabled={loading}>
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : userFound ? (
            "Clear"
          ) : (
            "Search"
          )}
        </button>
      </div>

      {searchResult && (
        <div className="search-result">
          {typeof searchResult === "string" ? (
            <p>{searchResult}</p>
          ) : (
            <div className="grid" ref={gridRef}>
              <div className="first1">
                <p>Name</p>
                <p>Father's Name</p>
                <p>CNIC</p>
                <p>License No</p>
                <p>License Type</p>
                <p>Issue Date</p>
                <p>Expiry Date</p>
              </div>
              <div className="second2">
                <p>{searchResult.name}</p>
                <p>{searchResult.fname}</p>
                <p>{searchResult.cnic}</p>
                <p>{searchResult.licenseNo}</p>
                <p>{searchResult.licenseType}</p>
                <p>{formatDate(searchResult.issueDate)}</p>
                <p>{formatDate(searchResult.expiryDate)}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Form;
