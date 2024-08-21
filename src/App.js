
import { useState } from 'react';
import './App.css';
import Detail from './components/Detail';
import Header from './components/Header';
import { Routes, Route } from "react-router-dom";

import Login from './components/Login';
import AddData from './components/AddData';
import DisplayData from './components/DisplayData';

function App() {
  const [shownavbar,setshownavbar] = useState(false)
    const [users, setUsers] = useState([]);

    const addUser = (newUser) => {
      setUsers([...users, newUser]);
    };
  return (
    <div className="App">
      <Header shownavbar={shownavbar} setshownavbar={setshownavbar} />
      <Routes>
        <Route path="/" element={<Detail />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AddNewEntry" element={<AddData addUser={addUser} />} />
        <Route path="/User" element={<DisplayData users={users} />} />
      </Routes>
    </div>
  );
}

export default App;
