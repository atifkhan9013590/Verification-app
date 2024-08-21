
import { useState } from 'react';
import './App.css';
import Detail from './components/Detail';
import Header from './components/Header';
import { Routes, Route } from "react-router-dom";

import Login from './components/Login';
import AddData from './components/AddData';


function App() {
  const [shownavbar,setshownavbar] = useState(false)
    const [users, setUsers] = useState([]);
     const [isEditing, setIsEditing] = useState(false);
     const [editingIndex, setEditingIndex] = useState(null);
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
        
          setUsers((prevUsers) =>
            prevUsers.map((user, index) =>
              index === editingIndex ? data : user
            )
          );
          setIsEditing(false);
          setEditingIndex(null);
        } else {
          
          setUsers([...users, data]);
        }
      };
    const deleteUser = (indexToDelete) => {
      setUsers((prevUser) =>
        prevUser.filter((user, index) => index !== indexToDelete)
      );
    };

      const editUser = (index) => {
        setFormData(users[index]);
        setIsEditing(true);
        setEditingIndex(index);
      };
  return (
    <div className="App">
      <Header shownavbar={shownavbar} setshownavbar={setshownavbar} />
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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
