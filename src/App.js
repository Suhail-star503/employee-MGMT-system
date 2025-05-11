import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar/navbar';
import Hero from './Hero/hero';
import Login from './pages/Login';
import Register from './pages/register';
import Allemp from './pages/allemp';
import Employee from './pages/employee';

import { auth } from './firebase';
import Dashboard from './pages/dashboard';
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [signin, setsignin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [totalsalary, setTotalsalary] = useState(0)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setsignin(!!user);

      if (user) {

        setUserId(user.uid);
      } else {

        setUserId('');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const Protect = ({ signin, children }) => {
    return signin ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      {!loading && (
        <Routes>
          <Route path="/" element={<Hero signin={signin} setsignin={setsignin} />} />
          <Route
            path="/dashboard"
            element={
              <Protect signin={signin}>
                <Dashboard signin={signin} setsignin={setsignin} userId={userId} totalsalary={totalsalary} setTotalsalary={setTotalsalary} />
              </Protect>
            }
          />
          <Route
            path='/dashboard/employeedata'
            element={
              <Protect signin={signin}>
                <Allemp signin={signin} setsignin={setsignin} userId={userId} setTotalsalary={setTotalsalary} totalsalary={totalsalary}/>
              </Protect>
            }
          />
          <Route
            path='/dashboard/employeedata/:id'
            element={
              <Protect signin={signin}>
                <Employee signin={signin} setsignin={setsignin} userId={userId} />
              </Protect>
            }
          />
          <Route path="/login" element={<Login setsignin={setsignin} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
