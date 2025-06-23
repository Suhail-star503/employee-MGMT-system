import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/navbar';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import {
    doc, getDoc, collection, addDoc, query, where,
    getDocs, updateDoc, deleteDoc
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { formatTimestamp } from './employeedeshboard';
import { ImProfile } from "react-icons/im";
import Style from './style.module.css';

export const deletetask = async (taskId, setTaskState) => {
    try {
        await deleteDoc(doc(db, "tasks", taskId));
        setTaskState(prev => prev.filter(t => t.id !== taskId));
        toast.success("Task completed successfully!", {
            position: "top-center",
            theme: "dark"
        });
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
    const [salary, setsalary] = useState(0);
    const [task, settask] = useState([]);

    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingTasks, setLoadingTasks] = useState(true);
    const [loadingSalary, setLoadingSalary] = useState(true);
    const [submittingTask, setSubmittingTask] = useState(false);
    const [submittingSalary, setSubmittingSalary] = useState(false);

    const fetchTasks = async () => {
        setLoadingTasks(true);
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
        } finally {
            setLoadingTasks(false);
        }
    };

    const handletask = async (e) => {
        e.preventDefault();
        const taskValue = e.target.task.value;
        setSubmittingTask(true);
        try {
            await addDoc(collection(db, "tasks"), {
                employeeId: id,
                userId: props.userId,
                task: taskValue,
            });
            e.target.reset();
            toast.success("Task assigned successfully.", {
                position: "top-center",
                theme: "dark"
            });
            await fetchTasks(); // Refresh task list without reload
        } catch (error) {
            toast.error(`Failed to assign task: ${error.message}`, {
                position: "top-center",
                theme: "dark"
            });
        } finally {
            setSubmittingTask(false);
        }
    };

    const handleset = async (e) => {
        e.preventDefault();
        const amount = e.target.amount.value;
        setSubmittingSalary(true);
        try {
            const collectionRef = collection(db, "Salary");
            const q = query(
                collectionRef,
                where("companyId", "==", props.userId),
                where("employee", "==", id)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const existingDoc = querySnapshot.docs[0];
                await updateDoc(existingDoc.ref, { amount });
                toast.success("Salary updated successfully.", {
                    position: "top-center",
                    theme: "dark"
                });
            } else {
                await addDoc(collectionRef, {
                    companyId: props.userId,
                    employee: id,
                    amount
                });
                toast.success("Salary added successfully.", {
                    position: "top-center",
                    theme: "dark"
                });
            }
            setsalary(amount);
            e.target.amount.value = '';
        } catch (e) {
            toast.error(`Error: ${e.message}`, {
                position: "top-center",
                theme: "dark"
            });
        } finally {
            setSubmittingSalary(false);
        }
    };

    const fetchSalary = async () => {
        setLoadingSalary(true);
        try {
            const q = query(
                collection(db, "Salary"),
                where("companyId", "==", props.userId),
                where("employee", "==", id)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const salaryData = querySnapshot.docs[0].data();
                setsalary(salaryData.amount);
            } else {
                setsalary(0);
            }
        } catch (error) {
            toast.error(`Error fetching salary: ${error.message}`, {
                position: "top-center",
                theme: "dark"
            });
        } finally {
            setLoadingSalary(false);
        }
    };

    const fetchUser = async () => {
        setLoadingUser(true);
        try {
            const docRef = doc(db, 'Users', id);
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
            setLoadingUser(false);
        }
    };

    useEffect(() => {
        if (id && props.userId) {
            fetchTasks();
            fetchSalary();
            fetchUser();
        }
    }, [id, props.userId]);

    return (
        <div style={{ paddingBottom: "50px" }}>
            <Navbar signin={props.signin} setsignin={props.setsignin} />
            <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '30px', color: '#970747' }}>
                Details and Performance
            </h1>

            <div className="container">
                {/* User Info */}
                <div className="row">
                    <div className={`col-12 ${Style.all}`} style={{ margin: 'auto', borderRadius: '0.8rem', padding: '30px', marginTop: '30px', color: 'white' }}>
                        {loadingUser ? (
                            <div className="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div>
                        ) : userdata ? (
                            <>
                                <h3 style={{ textAlign: 'center', marginBottom: "20px" }}>{userdata.name} <ImProfile style={{ fontSize: "30px" }} /></h3>
                                <h5>Email: {userdata.email}</h5>
                                <h5>Job Role: {userdata.jobrole}</h5>
                                <h5>Joined: {formatTimestamp(userdata.date)}</h5>
                                {loadingSalary ? (
                                    <div className="spinner-border text-light mt-2" role="status" />
                                ) : (
                                    <h5>Salary: {salary}</h5>
                                )}
                            </>
                        ) : (
                            <p>No user data available.</p>
                        )}
                    </div>
                </div>

                {/* Salary Update Form */}
                <div className="row">
                    <div className={`col-10 ${Style.all}`} style={{ margin: "30px auto", borderRadius: "0.8rem", padding: "25px" }}>
                        <h3 style={{ textAlign: "center", color: "white", marginBottom: "20px" }}>Set or Update Salary</h3>
                        <form onSubmit={handleset}>
                            <input type="number" className="form-control" name="amount" placeholder="Enter amount" required />
                            <button className="btn mt-3" type="submit" disabled={submittingSalary}
                                style={{ backgroundColor: "black", color: "white" }}>
                                {submittingSalary ? "Updating..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Assign Task Form */}
                <div className="row">
                    <div className={`col-10 ${Style.all}`} style={{ margin: "30px auto", borderRadius: "0.8rem", padding: "25px" }}>
                        <h3 style={{ textAlign: "center", color: "white", marginBottom: "20px" }}>Assign Task</h3>
                        <form onSubmit={handletask}>
                            <input type="text" className="form-control" name="task" placeholder="Task" required />
                            <button className="btn mt-3"
                                type="submit" disabled={submittingTask}
                                style={{ backgroundColor: "black", color: "white" }}>
                                {submittingTask ? "Assigning..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
                {/* Task List */}
                <div className="row">
                    <div className={`col-11 ${Style.all}`} style={{ margin: "30px auto", borderRadius: "0.8rem", padding: "25px" }}>
                        <h3 style={{ textAlign: "center", color: "white", marginBottom: "20px" }}>Assigned Tasks</h3>
                        {loadingTasks ? (
                            <div className="spinner-border text-light" role="status"><span className="visually-hidden">Loading...</span></div>
                        ) : task.length === 0 ? (
                            <p style={{ color: 'white', textAlign: 'center' }}>No tasks assigned.</p>
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
                                    <button className='btn btn-warning' onClick={() => deletetask(t.id, settask)}>Mark as Complete</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Employee;