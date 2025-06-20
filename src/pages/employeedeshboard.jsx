import React, { useEffect, useState } from 'react';
import Style from './style.module.css';
import { IoPersonAddSharp } from "react-icons/io5";
import { MdTask } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { HiCurrencyRupee } from "react-icons/hi2";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { deleteDoc } from 'firebase/firestore';
import { deletetask } from './employee';
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  const { seconds, nanoseconds } = timestamp;
  const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1e6);
  const date = new Date(milliseconds);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Employeedeshboard = (props) => {
  const [companyJoinDate, setCompanyJoinDate] = useState('');
  const [employeeJoinDate, setEmployeeJoinDate] = useState('');
  const [salary, setsalary] = useState(0);
  const [task, settask] = useState([]);

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const q = query(
          collection(db, "Salary"),
          where("employee", "==", props.userId)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const salaryData = querySnapshot.docs[0].data();
          setsalary(salaryData.amount); // adjust field name if different
        } else {
          toast.warning('Salary amount not found', {
            position: "top-center",
            theme: "dark"
          })
        }
      } catch (error) {
        toast.error(error, {
          position: "top-center",
          theme: "dark"
        })
      }
    };

    if (props.userId) {
      fetchSalary();
    }
  }, [props.userId]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const q = query(
          collection(db, "tasks"),
          where("employeeId", "==", props.userId)

        );
        const querySnapshot = await getDocs(q);
        const taskList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        settask(taskList);
      } catch (error) {
        toast.error(`Error fetching tasks: ${error.message}`, {
          position: "top-center",
          theme: "dark"
        });
      }
    };

    if (props.userId) {
      fetchTasks();
    }
  }, [props.userId]);

  useEffect(() => {
    if (props.companyData?.date) {
      setCompanyJoinDate(formatTimestamp(props.companyData.date));
    }
    if (props.userData?.date) {
      setEmployeeJoinDate(formatTimestamp(props.userData.date));
    }
  }, [props.companyData, props.userData]);

  return (
    <div>
      <div className='container' style={{marginTop:"100px",paddingBottom:"100px"}}>
        <div className="row">
          <div className={`col-11 col-lg-5 ${Style.salary}`}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h2>Current salary <HiCurrencyRupee /></h2>
            </div>
            <h5>{salary}</h5>
          </div>
          <div className={`col-11 col-lg-5 ${Style.profile}`}>
            <h2 style={{ textAlign: "center", marginBottom: "20px", marginTop: "10px" }}>Profile <IoPersonAddSharp /></h2>
            <div>
              <p><b>Name</b> : {props.userData.name}</p>
              <p><b>Email</b> : {props.userData.email}</p>
              <p><b>Job role</b> : {props.userData.jobrole}</p>
              <p><b>Joining date</b> : {employeeJoinDate}</p>
              <p><b>Job type</b> : Full-time</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className={`col-11 col-lg-5 ${Style.profile}`} style={{ height: "300px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px", marginTop: "10px" }}>You work here <FaBuilding /></h2>
            <div>
              <p><b>Company</b> : {props.companyData.company}</p>
              <p><b>Email</b> : {props.companyData.email}</p>
              <p><b>Name of admin</b> : {props.companyData.name}</p>
              <p><b>Joined</b> : {companyJoinDate}</p>
            </div>
          </div>
          <div className={`col-11 col-lg-5  ${Style.task}`}>
            <h2 style={{ textAlign: "center", marginBottom: "20px", marginTop: "10px", color: "white" }}>Your task <MdTask /></h2>

            {task.length === 0 ? (
              <p style={{ color: 'white', textAlign: 'center' }}>No task assigned.</p>
            ) : (
              task.map((t, index) => (
                <div key={index} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: 'white',
                  padding: "10px",
                  borderRadius: "0.8rem",
                  color: "#970747",
                  marginTop: "10px"
                }}>
                  <p><b>{t.task}</b></p>
                  <button className='btn btn-warning' onClick={() => deletetask(t.id, settask)}>Mark it Complete</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employeedeshboard;
