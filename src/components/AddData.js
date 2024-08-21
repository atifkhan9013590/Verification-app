import React, { useState } from "react";
import "./AddData.css";
import { useNavigate } from "react-router-dom";

function AddData({ addUser }) {
    const navigate= useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    fname: "",
    cnic: "",
    bloodGroup: "",
  });

  const handleCnicChange = (e) => {
    let cnic = e.target.value.replace(/\D/g, "");
    if (cnic.length > 5) {
      cnic = cnic.slice(0, 5) + "-" + cnic.slice(5);
    }
    if (cnic.length > 12) {
      cnic = cnic.slice(0, 12) + "-" + cnic.slice(12);
    }

    setFormData({ ...formData, cnic });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    setFormData({ name: "", fname: "", cnic: "", bloodGroup: "" }); 
  };

  const handleClick =() =>{
    navigate('/User')
  }

  return (
    <div className="data">
      <button onClick={handleClick}>Show Data</button>
      <form onSubmit={handleSubmit} className="data-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fname">Father's Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="Enter father's name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cnic">CNIC Number:</label>
          <input
            type="text"
            id="cnic"
            name="cnic"
            value={formData.cnic}
            onChange={handleCnicChange}
            placeholder="xxxxx-xxxxxxx-x"
            maxLength={15}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group:</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select your blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddData;
