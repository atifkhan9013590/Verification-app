import React from "react";
import "./Display.css";

function DisplayData({ users }) {
  return (
    <div className="display-data">
      <h2>Submitted User Data</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>Name:</strong> {user.name} <br />
            <strong>Father's Name:</strong> {user.fname} <br />
            <strong>CNIC:</strong> {user.cnic} <br />
            <strong>Blood Group:</strong> {user.bloodGroup} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayData;
