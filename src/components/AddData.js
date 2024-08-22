import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddData.css";
import DisplayData from "./DisplayData";
import { toast } from "react-hot-toast";
function AddData({
  users,
  deleteUser,
  editUser,
  formData,
  setFormData,
  isEditing,
  setUsers,
  setIsEditing,
}) {
  const [showForm, setShowForm] = useState(false);
   const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${apiUrl}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, [apiUrl, setUsers]);

  const handleCnicChange = (e) => {
    let cnic = e.target.value.replace(/\D/g, "");
    if (cnic.length > 5) {
      cnic = cnic.slice(0, 5) + "-" + cnic.slice(5);
    }
    if (cnic.length > 13) {
      cnic = cnic.slice(0, 13) + "-" + cnic.slice(13);
    }

    setFormData({ ...formData, cnic });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(`${apiUrl}/user/${formData._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Record updated");
      } else {
        await axios.post(`${apiUrl}/user`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Record Added");
      }

      setFormData({
        name: "",
        fname: "",
        cnic: "",
        licenseNo: "",
        licenseType: "",
        expiryDate: "",
        issueDate: "",
      });
      setShowForm(false);

      const response = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to submit data", error);
      toast.error(error.response.data.message);
    }
  };

  const handleClick = () => {
    setShowForm(true);
  };

  const handleOverlayClick = () => {
    setShowForm(false);
    setIsEditing(false)
    setFormData({
      name: "",
      fname: "",
      cnic: "",
      licenseNo: "",
      licenseType: "",
      expiryDate: "",
      issueDate: "",
    });
  };

  return (
    <div className="data">
      <div className="button-div">
        <button onClick={handleClick}>Add New Record</button>
      </div>

      {showForm && (
        <div className="form-overlay" onClick={handleOverlayClick}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="data-form"
          >
            {/* Form fields */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
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
              <label htmlFor="fname">Father's Name</label>
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
              <label htmlFor="cnic">CNIC Number</label>
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
              <label htmlFor="licenseNo">License Number</label>
              <input
                type="text"
                id="licenseNo"
                name="licenseNo"
                value={formData.licenseNo}
                onChange={handleChange}
                placeholder="Enter license number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="licenseType">License Type</label>
              <input
                type="text"
                id="licenseType"
                name="licenseType"
                value={formData.licenseType}
                onChange={handleChange}
                placeholder="Enter license type"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="issueDate">Issue Date</label>
              <input
                type="date"
                id="issueDate"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                required
              />
            </div>

            <button className="submitbtn" type="submit">
              {isEditing ? "Update Data" : "Add Data"}
            </button>
          </form>
        </div>
      )}
      <DisplayData
        users={users}
        deleteUser={deleteUser}
        editUser={editUser}
        setShowForm={setShowForm}
      />
    </div>
  );
}

export default AddData;
