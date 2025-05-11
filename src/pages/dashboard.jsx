import React, { useState, useEffect } from 'react';
import Admindashboard from './admindashboard';
import Navbar from '../Navbar/navbar';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import Employeedeshboard from './employeedeshboard';

const Dashboard = (props) => {
  const [userData, setUserData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allEmployees, setAllEmployees] = useState([]);
  // const [totalslary, setTotalsalary] = useState(0)

  useEffect(() => {
    if (!props.userId) {
      console.warn("No userId provided");
      setLoading(false);
      return;
    }

    const findUserWithId = async () => {
      setLoading(true);
      try {
        const userDocRef = doc(db, "Users", props.userId);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUserData(data); // set userData (asynchronously)

          if (data?.role === 'Employee') {
            const companyDocRef = doc(db, 'Users', data.company);
            const companySnapshot = await getDoc(companyDocRef);

            if (companySnapshot.exists()) {
              setCompanyData(companySnapshot.data());
            } else {
              toast.error('No company found at this id', {
                position: "top-center",
                theme: "dark",
              });
            }
          } else if (data?.role === 'Admin') {
            // Correct: use the collection name exactly as in Firestore
            const usersRef = collection(db, "Users");

            

            const q = query(
              usersRef,
              where("role", "==", "Employee"),
              where("company", "==", props.userId)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
              
              setAllEmployees([]);
            } else {
              const employees = [];
              querySnapshot.forEach((doc) => {
                employees.push({ id: doc.id, ...doc.data() });
              });
              setAllEmployees(employees);
            }

            // fetch salary and find total amount
            // Fetch salary documents and calculate total salary
            const salaryRef = collection(db, "Salary");
            const salaryQuery = query(salaryRef, where("companyId", "==", props.userId));
            const salarySnapshot = await getDocs(salaryQuery);

            let total = 0;
            salarySnapshot.forEach(doc => {
              const data = doc.data();
              const amount = parseFloat(data.amount);
              if (!isNaN(amount)) {
                total += amount;
              }
            });

            props.setTotalsalary(total);

          }

        } else {
          toast.error('User not found', {
            position: "top-center",
            theme: "dark",
          });
        }

      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          theme: "dark",
        });
      } finally {
        setLoading(false);
      }
    };

    findUserWithId();
  }, [props.userId,props.totalslary]);

  return (
    <div>
      <Navbar signin={props.signin} setsignin={props.setsignin} />

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <h2 style={{ textAlign: "center", color: "#970747", marginBottom: "35px" }}>Your dashboard</h2>

          {userData?.role === 'Admin' && (
            <Admindashboard
              userData={{
                name: userData.adminname,
                email: userData.email,
                date: userData.createdAt,
                company: userData.company,
                role: userData.role
              }}
              allemployees={allEmployees}
              userId={props.userId}
              totalsalary={props.totalsalary}
            />
          )}

          {userData?.role === 'Employee' && (
            <Employeedeshboard
              companyData={{
                name: companyData?.adminname,
                email: companyData?.email,
                date: companyData?.createdAt,
                company: companyData?.company
              }}
              userData={{
                name: userData.name,
                email: userData.email,
                date: userData.createdAt,
                jobrole: userData.jobrole
              }}
              userId={props.userId}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
