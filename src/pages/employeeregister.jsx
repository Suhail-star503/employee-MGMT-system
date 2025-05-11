import React, { useState } from 'react'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { setDoc,doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
const Employeeregister = (props) => {
  const navigate = useNavigate();
  const [Ids,setIds]=useState([]);

  const CollectionRef = collection(db, 'Users');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(CollectionRef);
        const idArray = [];
       
        querySnapshot.forEach((doc) => {
         
          idArray.push({role:doc.data().role,id:doc.id});
        });
    
        setIds(idArray);
    
      } catch (error) {
        toast.error(error, {
          position: "top-center",
          theme: "dark",
        });
      }
    };
    fetchData();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value
    const password = e.target.password.value;
    const name=e.target.name.value;
    const company=e.target.Id.value;
    const jobrl=e.target.jobrole.value;
    const role='Employee'
    
    const result = Ids.find(id => id.role === 'Admin' && id.id === company);
    
    if(result){
      createUserWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed up successfully!
        const user = userCredential.user;

        await setDoc(doc(db, "Users", user.uid), {
          // id: user.uid,
          email: email,
          company: company,
          name: name,
          role: role,
          jobrole:jobrl,
          createdAt: new Date()
        });
        
        toast.success('Registered successfully', {
          position: "top-center",
          theme: "dark",
        });
        navigate('/login')
        e.target.reset();
      })
      .catch((error) => {
        // Handle errors here

        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });

      });
    }
    else{
      toast.error(`Company doesn't exist of this id`, {
        position: "top-center",
        theme: "dark",
      });
    }
    
  }
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='name' required />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword12" className="form-label">Email</label>
          <input type="email" name='email' className="form-control" id="exampleInputPassword1" required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword19" className="form-label">Create password</label>
          <input type="text" name='password' className="form-control" id="exampleInputPassword19" required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword29" className="form-label">Job role</label>
          <input type="text" name='jobrole' className="form-control" id="exampleInputPassword29" required />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword13" className="form-label">Enter id which is provided by admin</label>
          <input type="text" name='Id' className="form-control" id="exampleInputPassword13" required />
        </div>

        


        <button type="submit" className="btn" style={{ backgroundColor: "#970747", color: "white" }}>Submit</button>
      </form>
    </div>
  )
}

export default Employeeregister

