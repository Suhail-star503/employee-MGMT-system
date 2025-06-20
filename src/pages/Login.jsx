import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Style from './style.module.css'

export default function Login({ setsignin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
     
      .then(() => {
        setsignin(true);
        setError(null);
        toast.success('Login successfully', { position: "top-center", theme: "dark" });

        navigate('/dashboard');
      setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message, { position: "top-center", theme: "dark" });
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <div style={{
        height: "100vh", marginTop: "30px", display: "flex", justifyContent: "center", alignItems: "center"
      }}>
        <div className={`card p-4 shadow ${Style.login}`} style={{ width: '90%', maxWidth: '400px', }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            {error && <div className="text-danger mb-3">{error}</div>}
            <div className="d-grid">
              <button type="submit" className="btn" style={{ backgroundColor: "black", color: "white" }}>
                {loading ? <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div> : 'Login'}
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <small>
              Don't have an account? <Link to="/register">Register now</Link>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}