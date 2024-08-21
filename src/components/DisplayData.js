import React from "react";
import "./Display.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function DisplayData({ users, deleteUser, editUser, setShowForm }) {

  const handleClickEdit = (indexEdit)=>{
    editUser(indexEdit)
    setShowForm(true)
  }
  return (
    <div className="display-data">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Father's Name</th>
              <th>CNIC</th>
              <th>License No</th>
              <th>License Type</th>
              <th>Expiry Date</th>
              <th>Issue Date</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.fname}</td>
                <td>{user.cnic}</td>
                <td>{user.licenseNo}</td>
                <td>{user.licenseType}</td>
                <td>{user.expiryDate}</td>
                <td>{user.issueDate}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="edticon"
                    onClick={() => handleClickEdit(index)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="dlticon"
                    onClick={() => deleteUser(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayData;
