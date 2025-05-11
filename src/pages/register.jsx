import React from 'react'
import Adminregister from './adminregister'
import Employeeregister from './employeeregister'
import Style from './style.module.css'
import Navbar from '../Navbar/navbar'
import { useState } from 'react'
const Register = (props) => {
  const [admin, setadmin] = useState('');
  const handleadmin = () => {
    setadmin('admin');

  }
  const handleemployee = () => {
    setadmin('employee');

  }
  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", color: "#970747", marginTop: "30px", marginBottom: "30px" }}>Registration form</h1>

      <div className={Style.register}>
        <div style={{ display: "flex", justifyContent:"space-between",alignItems:"center" }}>
          <button className='btn' style={{ backgroundColor: "#970747", color: "white", margin: "20px" }} onClick={handleadmin}>Admin account</button>
          <button className='btn' style={{ backgroundColor: "#970747", color: "white"}} onClick={handleemployee}>Employee account</button>
        </div>
        {
          admin===''?<h2 style={{color:"#970747",textAlign:"center",marginTop:"30px",marginBottom:"30px"}}>Please choose an account type.</h2>:null
        }

        {
          admin==='admin' ? <Adminregister/> : admin==='employee'?<Employeeregister/>:null
        }
      </div>
    </>
  )
}

export default Register


