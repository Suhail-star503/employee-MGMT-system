import React, { useEffect, useState } from 'react';
import Style from './style.module.css';
import { MdManageAccounts } from "react-icons/md";
import { formatTimestamp } from './employeedeshboard';
import { CgProfile } from "react-icons/cg";
import { HiMiniDocumentCurrencyRupee } from "react-icons/hi2";
import { FaIndianRupeeSign } from "react-icons/fa6"
import { Link } from 'react-router-dom';

const Admindashboard = (props) => {
  const [Joined, setjoined] = useState('')
  useEffect(() => {

    if (props.userData?.date) {
      setjoined(formatTimestamp(props.userData.date));
    }
  }, [props.companyData, props.userData]);
  


  return (
    <div>
      <div className="container" style={{marginTop:"150px", paddingBottom: "100px"}}>
        <div className="row">

        <div className={`col-11 col-lg-5 ${Style.salary }`} style={{ paddingTop: "80px", paddingBottom: "100px" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <span><h3>Employees data <MdManageAccounts style={{ fontSize: "52px" }} /></h3></span>
            </div>
            <h4>Total employees : {
              props.allemployees.length
            }</h4>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <Link to={'employeedata'} state={{ allemployees: props.allemployees }}>
              <button className='btn' style={{backgroundColor:'black',color:"white"}}>Click to know more</button>
              </Link>
            </div>
          </div>
          
          <div className={`col-11 col-lg-5 ${Style.profile}`} style={{ height: "350px" }}>
            <h2 style={{ textAlign: "center", marginBottom: '40px' }}>Profile <CgProfile style={{ fontSize: "52px" }} /></h2>
            <p><b>Company</b> : {props.userData.company}</p>
            <p><b>Admin</b> : {props.userData.name}</p>
            <p><b>Joined </b> : {Joined}</p>
            <p><b>Email</b> : {props.userData.email}</p>
            <p><b>Company id</b> : {props.userId}</p>
          </div>
        </div>
        <div className="row">
          <div className={`col-11 ${Style.total}`} style={{ marginTop: "30px", borderRadius: "0.8rem", color: "white", padding: "10px", marginLeft: "auto", marginRight: "auto", paddingTop: "20px" }}>
            <h1 style={{ textAlign: 'center' }}>Total amount of salary</h1>
            <div style={{ width: "200px", marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}>
              <span>
                <HiMiniDocumentCurrencyRupee style={{ fontSize: "200px" }} />
              </span>
            </div>
            <h3 style={{ textAlign: "center", paddingBottom: "50px" }}><FaIndianRupeeSign />{props.totalsalary}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
