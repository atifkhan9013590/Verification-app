import React from 'react'
import background from '../Images/background.png'
import './Detail.css'
import Form from './Form'
function Detail() {
  return (
    <div className='picture-div'>
        <img src={background} className='background' alt='back'/>
        <Form></Form>
    </div>
  )
}

export default Detail