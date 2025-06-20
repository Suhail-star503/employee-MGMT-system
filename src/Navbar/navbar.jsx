import React from 'react';
import { RiMenuFold2Line } from "react-icons/ri";
import Style from './nav.module.css';
// import { Link } from 'react-router-dom';

import { BiLogOut } from "react-icons/bi";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify/unstyled';
// import { useNavigate } from 'react-router-dom';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
const Navbar = (props) => {
    const navigate = useNavigate();
    const logout = () => {
        signOut(auth).then(() => {
            toast.success('Logout successfully', {
                position: "top-center",
                theme: "dark",
            });

            navigate('/')
        }).catch((error) => {
            toast.error(error, {
                position: "top-center",
                theme: "dark",
            });
        })
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "rgb(17 24 39 )", marginBottom: "50px", padding: "20px 10px",position:"fixed",zIndex:"1000",width:"100%",top:"-5px" }}>
                <div className="container-fluid">
                    <h1 style={{ color: 'chocolate',fontWeight:"bold" }}>Assistora</h1>
                    <ul style={{ display: 'flex' }}>

                        <li>
                            <NavLink to="/">
                                {({ isActive }) => (
                                    <button
                                        className='btn'
                                        style={{
                                            textDecoration: "none",
                                            color: isActive ? "black" : "white",
                                            padding: "10px 10px",
                                            borderRadius: "20px",
                                            backgroundColor: isActive ? "#ffd900" : "black",
                                            boxShadow: isActive
                                                ? "0 0 10px #ffd900, 0 0 20px #ffd900"
                                                : "0 0 10px #ffd900, 0 0 20px #ffd900",
                                            fontWeight: "bold"
                                        }}
                                        onClick={() => {
                                            document.querySelector('[data-bs-dismiss="offcanvas"]')?.click();
                                        }}
                                    >
                                        Home
                                    </button>
                                )}
                            </NavLink>


                        </li>
                        {
                            props.signin ? <li><button className='btn' style={{
                                textDecoration: "none", color: "black", padding: "10px 10px", borderRadius: '20px', backgroundColor: "#ffd900", boxShadow: "0 0 10px #ffd900, 0 0 20px #ffd900", fontWeight: "bold"
                            }}
                                onClick={() => {
                                    document.querySelector('[data-bs-dismiss="offcanvas"]').click();
                                    logout();
                                }}>
                                Logout
                            </button></li> : (<><li>
                                <NavLink to="/login">
                                    {({ isActive }) => (
                                        <button
                                            className='btn'
                                            style={{
                                                textDecoration: "none",
                                                color: isActive ? "black" : "white",
                                                padding: "10px 10px",
                                                borderRadius: "20px",
                                                backgroundColor: isActive ? "#ffd900" : "black",
                                                boxShadow: isActive
                                                    ? "0 0 10px #ffd900, 0 0 20px #ffd900"
                                                    : "0 0 10px #ffd900, 0 0 20px #ffd900",
                                                fontWeight: "bold"
                                            }}
                                            onClick={() => {
                                                document.querySelector('[data-bs-dismiss="offcanvas"]')?.click();
                                            }}
                                        >
                                            Sing In
                                        </button>
                                    )}
                                </NavLink></li>
                                <li><NavLink to="/register">
                                {({ isActive }) => (
                                    <button
                                        className='btn'
                                        style={{
                                            textDecoration: "none",
                                            color: isActive ? "black" : "white",
                                            padding: "10px 10px",
                                            borderRadius: "20px",
                                            backgroundColor: isActive ? "#ffd900" : "black",
                                            boxShadow: isActive
                                                ? "0 0 10px #ffd900, 0 0 20px #ffd900"
                                                : "0 0 10px #ffd900, 0 0 20px #ffd900",
                                            fontWeight: "bold"
                                        }}
                                        onClick={() => {
                                            document.querySelector('[data-bs-dismiss="offcanvas"]')?.click();
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                )}
                            </NavLink></li></>)
                        }

                    </ul>
                    <button
                        className={`btn ${Style.custom}`}
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasExample"
                        aria-controls="offcanvasExample"
                    >
                        <RiMenuFold2Line style={{ fontSize: "25px", color: "white" }} />
                    </button>
                </div>
            </nav>

            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
                style={{ backgroundColor: "rgb(17 24 39 )", color: "white" }}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                        style={{ backgroundColor: "white" }}
                    ></button>
                </div>
                <div className="offcanvas-body" style={{width:"80%",margin:"60px auto"}}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px",width:"100%",margin:"auto" }}>
                        <NavLink to="/">
                                {({ isActive }) => (
                                    <button
                                        className='btn'
                                        style={{
                                            textDecoration: "none",
                                            width:"100%",
                                            margin:"10px",
                                            color: isActive ? "black" : "white",
                                            padding: "10px 10px",
                                            borderRadius: "20px",
                                            backgroundColor: isActive ? "#ffd900" : "black",
                                            boxShadow: isActive
                                                ? "0 0 10px #ffd900, 0 0 20px #ffd900"
                                                : "0 0 10px #ffd900, 0 0 20px #ffd900",
                                            fontWeight: "bold"
                                        }}
                                        onClick={() => {
                                            document.querySelector('[data-bs-dismiss="offcanvas"]')?.click();
                                        }}
                                    >
                                        Home
                                    </button>
                                )}
                            </NavLink>
                        <NavLink to="/dashboard">
                                {({ isActive }) => (
                                    <button
                                        className='btn'
                                        style={{
                                            textDecoration: "none",
                                            width:"100%",
                                            margin:"10px",
                                            color: isActive ? "black" : "white",
                                            padding: "10px 10px",
                                            borderRadius: "20px",
                                            backgroundColor: isActive ? "#ffd900" : "black",
                                            boxShadow: isActive
                                                ? "0 0 10px #ffd900, 0 0 20px #ffd900"
                                                : "0 0 10px #ffd900, 0 0 20px #ffd900",
                                            fontWeight: "bold"
                                        }}
                                        onClick={() => {
                                            document.querySelector('[data-bs-dismiss="offcanvas"]')?.click();
                                        }}
                                    >
                                        Dashboard
                                    </button>
                                )}
                            </NavLink>
                        {
                            props.signin ? <button className='btn' style={{ backgroundColor: "white", color: "#970747" }} onClick={() => {
                                document.querySelector('[data-bs-dismiss="offcanvas"]').click();
                                logout()
                            }}><BiLogOut style={{ fontSize: "25px" }} /> Logout</button> : <>

                                <NavLink to="/login">
                                {({ isActive }) => (
                                    <button
                                        className='btn'
                                        style={{
                                            textDecoration: "none",
                                            width:"100%",
                                            margin:"10px",
                                            color: isActive ? "black" : "white",
                                            padding: "10px 10px",
                                            borderRadius: "20px",
                                            backgroundColor: isActive ? "#ffd900" : "black",
                                            boxShadow: isActive
                                                ? "0 0 10px #ffd900, 0 0 20px #ffd900"
                                                : "0 0 10px #ffd900, 0 0 20px #ffd900",
                                            fontWeight: "bold"
                                        }}
                                        onClick={() => {
                                            document.querySelector('[data-bs-dismiss="offcanvas"]')?.click();
                                        }}
                                    >
                                        Sign In
                                    </button>
                                )}
                            </NavLink>
                                <NavLink to="/register">
                                {({ isActive }) => (
                                    <button
                                        className='btn'
                                        style={{
                                            textDecoration: "none",
                                            width:"100%",
                                            margin:"10px",
                                            color: isActive ? "black" : "white",
                                            padding: "10px 10px",
                                            borderRadius: "20px",
                                            backgroundColor: isActive ? "#ffd900" : "black",
                                            boxShadow: isActive
                                                ? "0 0 10px #ffd900, 0 0 20px #ffd900"
                                                : "0 0 10px #ffd900, 0 0 20px #ffd900",
                                            fontWeight: "bold"
                                        }}
                                        onClick={() => {
                                            document.querySelector('[data-bs-dismiss="offcanvas"]')?.click();
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                )}
                            </NavLink></>
                        }

                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Navbar;