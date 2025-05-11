import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/navbar';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { formatTimestamp } from './employeedeshboard';
import { ImProfile } from "react-icons/im";
import { collection, addDoc, query, where, } from "firebase/firestore";
import { getDocs, updateDoc } from "firebase/firestore";
import { deleteDoc } from 'firebase/firestore';

export const deletetask = async (taskId, setTaskState) => {
    try {
        await deleteDoc(doc(db, "tasks", taskId));
        toast.success("Task completed successfully!", {
            position: "top-center",
            theme: "dark"
        });

        
        setTaskState(prev => prev.filter(t => t.id !== taskId));
    } catch (error) {
        toast.error(`Error deleting task: ${error.message}`, {
            position: "top-center",
            theme: "dark"
        });
    }
};


const Employee = (props) => {
    const { id } = useParams();
    const [userdata, setUserdata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [salary, setsalary] = useState(0);
    const [task, settask] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const q = query(
                    collection(db, "tasks"),
                    where("employeeId", "==", id),
                    where("userId", "==", props.userId)
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

        if (id && props.userId) {
            fetchTasks();
        }
    }, [id, props.userId]);

    const handletask = async (e) => {
        e.preventDefault();
        const task = e.target.task.value;

        try {
            await addDoc(collection(db, "tasks"), {
                employeeId: id,
                userId: props.userId,
                task: task,

            });

            toast.success("Task assigned successfully! Please reload the page to see the update.", {
                position: "top-center",
                theme: "dark"
            });

            e.target.reset(); // Clear the form input
        } catch (error) {
            toast.error(`Failed to assign task: ${error.message}`, {
                position: "top-center",
                theme: "dark"
            });
        }
    };

    const handleset = async (e) => {
        e.preventDefault();
        const amount = e.target.amount.value;
        try {
            const collectionRef = collection(db, "Salary");
            const q = query(
                collectionRef,
                where("companyId", "==", props.userId),
                where("employee", "==", id)
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                // Document exists, update the first one found
                const existingDoc = querySnapshot.docs[0];
                const docRef = existingDoc.ref;

                await updateDoc(docRef, {
                    amount: amount
                });

                toast.success("Salary updated successfully! Please reload the page to see the update.", {
                    position: "top-center",
                    theme: "dark"
                });

            } else {
                // No matching document, create a new one
                await addDoc(collectionRef, {
                    companyId: props.userId,
                    employee: id,
                    amount: amount
                });

                toast.success("Salary added successfully! Please reload the page to see the update.", {
                    position: "top-center",
                    theme: "dark"
                });
            }
               e.target.amount.value=''
        } catch (e) {
            toast.error(`Error: ${e.message}`, {
                position: "top-center",
                theme: "dark"
            });
        }
    };

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const collectionRef = collection(db, "Salary");
                const q = query(
                    collectionRef,
                    where("companyId", "==", props.userId),
                    where("employee", "==", id)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const salaryData = querySnapshot.docs[0].data();
                    setsalary(salaryData.amount);
                } else {
                    setsalary(0); // Default if not set
                }
            } catch (error) {
                toast.error(`Error fetching salary: ${error.message}`, {
                    position: "top-center",
                    theme: "dark"
                });
            }
        };

        if (props.userId && id) {
            fetchSalary();
        }
    }, [props.userId, id]);




    useEffect(() => {
        async function getSpecificDocument(userId) {
            const docRef = doc(db, 'Users', userId);

            try {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserdata({
                        name: data.name || 'N/A',
                        email: data.email || 'N/A',
                        date: data.createdAt || 'N/A',
                        jobrole: data.jobrole || 'N/A',
                    });

                } else {
                    toast.error('Document not found', {
                        position: 'top-center',
                        theme: 'dark',
                    });
                }
            } catch (error) {
                toast.error(`Error fetching user: ${error.message}`, {
                    position: 'top-center',
                    theme: 'dark',
                });
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            getSpecificDocument(id);
        }
    }, [id]);

    return (
        <div style={{ paddingBottom: "50px" }}>
            <Navbar signin={props.signin} setsignin={props.setsignin} />
            <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '30px', color: '#970747' }}>
                Details and Performance
            </h1>

            <div className="container">
                <div className="row">
                    <div
                        className="col-11"
                        style={{

                            backgroundColor: '#970747',
                            margin: 'auto',
                            borderRadius: '0.8rem',
                            padding: '20px',
                            paddingTop: '30px',
                            paddingBottom: '30px',
                            marginTop: '30px',
                            color: 'white',
                        }}
                    >
                        {loading ? (
                            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : userdata ? (
                            <>
                                <h3 style={{ textAlign: 'center', marginBottom: "20px" }}>{userdata.name} <ImProfile style={{ fontSize: "30px" }} /></h3>
                                <h5 style={{ marginTop: "50px" }}>Email : {userdata.email}</h5>
                                <h5 style={{ marginTop: "25px" }}>Job role : {userdata.jobrole}</h5>
                                <h5 style={{ marginTop: "25px" }}>Joined : {formatTimestamp(userdata.date)}</h5>
                                <h5 style={{ marginTop: "25px" }}>Salary : {salary}</h5>
                            </>
                        ) : (
                            <p>No user data available.</p>
                        )}
                    </div>

                </div>
                <div className="row">
                    <div className="col-10" style={{ height: "200px", backgroundColor: "green", marginTop: "30px", borderRadius: "0.8rem", marginLeft: "auto", marginRight: "auto", paddingTop: "25px" }}>
                        <h3 style={{ textAlign: "center", color: "white", marginBottom: "20px" }}>Set or update salary</h3>
                        <form onSubmit={handleset}>
                            <input type="number" className="form-control" placeholder='Enter amount' name='amount' required />
                            <button className='btn btn-primary' type='submit' style={{ marginTop: "20px" }}>Submit</button>
                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-10 bg-primary" style={{ height: "200px", marginTop: "30px", borderRadius: "0.8rem", marginLeft: "auto", marginRight: "auto", paddingTop: "25px" }}>
                        <h3 style={{ textAlign: "center", color: "white", marginBottom: "20px" }}>Give task</h3>
                        <form onSubmit={handletask}>
                            <input type="text" className="form-control" placeholder='Task' name='task' required />
                            <button className='btn btn-warning' type='submit' style={{ marginTop: "20px" }}>Submit</button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-11 bg-primary" style={{ marginTop: "30px", borderRadius: "0.8rem", marginLeft: "auto", marginRight: "auto", paddingTop: "25px", paddingBottom: "20px" }}>
                        <h3 style={{ textAlign: "center", color: "white", marginBottom: "20px" }}>Given task</h3>
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

export default Employee;
