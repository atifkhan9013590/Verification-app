import React from "react";
import "./Display.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function DisplayData({ users, deleteUser, editUser, setShowForm }) {

  const handleClickEdit = (indexEdit)=>{
    editUser(indexEdit)
    setShowForm(true)
  }
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  return (
    <div className="display-data">
      <div className="table-container">
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Father's Name</th>
                <th>CNIC</th>
                <th>License No</th>
                <th>License Type</th>
                <th>Issue Date</th>
                <th>Expiry Date</th>

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
                  <td>{formatDate(user.issueDate)}</td>
                  <td>{formatDate(user.expiryDate)}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="edticon"
                      onClick={() => handleClickEdit(index)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="dlticon"
                      onClick={() => deleteUser(user._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>NO DATA ADDED YET</p>
        )}
      </div>
    </div>
  );
}

export default DisplayData;
