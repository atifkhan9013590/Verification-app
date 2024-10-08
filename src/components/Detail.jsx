import React from 'react'
import background from '../Images/background.png'
import './Detail.css'
import Form from './Form'
function Detail({ users }) {
  return (
    <div className="picture-div">
      <img src={background} className="background" alt="back" />
      <Form users={users} />
      <div className="last-div-line">
        <p>Traffic Police of Pakistan</p>
      </div>
    </div>
  );
}

export default Detail