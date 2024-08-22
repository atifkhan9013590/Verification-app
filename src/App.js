import { useState } from "react";
import "./App.css";
import Detail from "./components/Detail";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AddData from "./components/AddData";
import axios from "axios";
import { Toaster } from "react-hot-toast";

function App() {
  const [shownavbar, setshownavbar] = useState(false);
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  // Removed unused `editingIndex` state
  const [formData, setFormData] = useState({
    name: "",
    fname: "",
    cnic: "",
    licenseNo: "",
    licenseType: "",
    expiryDate: "",
    issueDate: "",
  });

  const addUser = (data) => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setUsers([...users, data]);
    }
  };

  const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    try {
         const apiUrl = process.env.REACT_APP_API_BASE_URL;

      await axios.delete(`${apiUrl}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axios.get(`${apiUrl}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const editUser = (index) => {
    setFormData(users[index]);
    setIsEditing(true);
  };

  return (
    <div className="App">
      <Header shownavbar={shownavbar} setshownavbar={setshownavbar} />
      <Toaster />
      <Routes>
        <Route path="/" element={<Detail users={users} />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/AddNewEntry"
          element={
            <AddData
              addUser={addUser}
              users={users}
              deleteUser={deleteUser}
              editUser={editUser}
              formData={formData}
              setFormData={setFormData}
              isEditing={isEditing}
              setUsers={setUsers}
              setIsEditing={setIsEditing}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
