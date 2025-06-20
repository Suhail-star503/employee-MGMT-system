import React, { useState } from 'react'
import app from '../firebase';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';


const Adminregister = (props) => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value
    const password = e.target.password.value;
    const company = e.target.company.value;
    const adminname = e.target.adminname.value;


    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up successfully!
        const user = userCredential.user;

        await setDoc(doc(db, "Users", user.uid), {
          // id: user.uid,
          email: email,
          company: company,
          adminname: adminname,
          role: 'Admin',
          createdAt: new Date()
        });

        // end functionality

        toast.success('Registered successfully', {
          position: "top-center",
          theme: "dark",
        });
        setLoading(false);
        navigate('/login')
      })
      .catch((error) => {
        // Handle errors here
        setLoading(false);
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });

      });

  }
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name of your company</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='company' required placeholder='Name' />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Email of your company</label>
          <input type="email" className="form-control" id="exampleInputPassword1" name='email' required placeholder='Email' />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword12" className="form-label">Name of admin</label>
          <input type="text" className="form-control" id="exampleInputPassword12"
            name='adminname' required placeholder='Name of admin' />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword13" className="form-label">Create password</label>
          <input type="text" className="form-control" id="exampleInputPassword13"
            name='password' required placeholder='Password' />
        </div>


        <div className="mb-3">

          <input type="hidden" className="form-control"
            id="exampleInputPassword14" value={"admin"} name='role' placeholder='Type of role' />
        </div>

        <button type="submit" className="btn" style={{ backgroundColor: "black", color: "white", padding: "10px 20px" }}>{loading ? <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div> : 'Submit'}</button>
      </form>
    </div>

  )
}

export default Adminregister
