import React, { useEffect } from 'react';
import Navbar from '../Navbar/navbar';
import { useLocation } from 'react-router-dom';
import { formatTimestamp } from './employeedeshboard';
import { Link } from 'react-router-dom';
import Style from './style.module.css';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";


const Allemp = (props) => {
    const location = useLocation();
    const allemployees = location.state?.allemployees || [];
    const navigate = useNavigate()
    const handledelete = async (id) => {
        
        if (window.confirm("Are you sure you want to delete this employee?")) {
        try {
            const q = query(collection(db, "Salary"), where("employee", "==", id));
            const querySnapshot = await getDocs(q);
            

                let totalDeduction = 0;

                // Loop through all matching salary documents
                querySnapshot.forEach(async(docSnap) => {
                    const data = docSnap.data();
                    const amount = parseFloat(data.amount);
                    if (!isNaN(amount)) {
                        totalDeduction += amount;
                    }
                   await deleteDoc(doc(db, "Salary", docSnap.id));
                });
                

                // Deduct from total salary
                if (totalDeduction > 0) {
                    props.setTotalsalary((prev) => prev - totalDeduction);
                }
                     
                // Now delete the user document
                await deleteDoc(doc(db, "Users", id));

                toast.success("Employee deleted successfully!", {
                    position: "top-center",
                    theme: "dark"
                });

                navigate('/dashboard');
        } catch (error) {
            toast.error(`Error deleting employee: ${error.message}`, {
                position: "top-center",
                theme: "dark"
            });
        }
        }
    };




    return (
        <div>
            <Navbar signin={props.signin} setsignin={props.setsignin} />
            <div className="container py-4" style={{ marginTop: "200px" }}>
                <div className="row">

                    {allemployees.length === 0 ? (
                        <div className="col-11" style={{ paddingTop: "30px" }}>
                            <div style={{ width: "18rem", margin: "auto" }}>
                                <img src="https://static.vecteezy.com/system/resources/previews/004/968/515/original/no-file-or-data-found-in-the-folder-concept-illustration-flat-design-eps10-simple-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg" className="img-fluid" alt="" style={{borderRadius:"50%"}}></img>
                                <h4 style={{ textAlign: "center" ,color:"white"}}>Employees not found</h4>
                            </div>
                        </div>
                    ) :
                        allemployees.map((emp, index) => (
                            <div
                                key={index}
                                className="col-11  col-md-6 col-lg-4 mb-4"
                            >
                                <div
                                    className={`card h-100 shadow-sm ${Style.all}`}
                                    style={{ borderRadious: "10x", color: "white", paddingTop: "20px", paddingBottom: "20px" }}
                                >
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ textAlign: "center", marginBottom: "20px" }}>{emp.name}</h5>
                                        <p className="card-text" style={{ lineHeight: "30px" }}>
                                            <strong>Email :</strong> {emp.email}<br />
                                            <strong>Job role :</strong> {emp.jobrole}<br />
                                            <strong>Joined date :</strong> {formatTimestamp(emp.createdAt)}
                                        </p>
                                        <Link to={`${emp.id}`}>
                                            <button className='btn' style={{ backgroundColor: "white", color: "#970747" }}>View profile</button>
                                        </Link>
                                        <button className='btn' style={{ backgroundColor: "white", color: "#970747", marginLeft: "20px" }} onClick={() => handledelete(emp.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }



                </div>
            </div>
        </div>
    );
};

export default Allemp;


