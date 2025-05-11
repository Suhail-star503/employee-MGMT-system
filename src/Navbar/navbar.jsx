import React from 'react';
import { RiMenuFold2Line } from "react-icons/ri";
import Style from './nav.module.css';
import { Link, Outlet } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlineLogin } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify/unstyled';
import { useNavigate } from 'react-router-dom';
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
            <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#970747", marginBottom: "50px" }}>
                <div className="container-fluid">
                    <h2 style={{ color: 'white' }}>Assistora</h2>
                    <ul style={{ display: 'flex' }}>
                        <li><Link to='/'><FaHome style={{ fontSize: "25px" }} /> Home</Link></li>
                        <li><Link to='/dashboard'><MdDashboardCustomize style={{ fontSize: "25px" }} /> Your dashboard</Link></li>
                        {
                            props.signin ? <li><button className='btn' style={{ backgroundColor: "white", color: "#970747" }}onClick={logout}><BiLogOut style={{ fontSize: "25px" }} /> Logout</button></li> : (<><li><Link to='/login'><MdOutlineLogin style={{ fontSize: "25px" }} /> Login</Link></li>
                                <li><Link to='/register'><MdAccountBox style={{ fontSize: "25px" }} /> Register</Link></li></>)
                        }
                        {/* <li><button className='btn' style={{ backgroundColor: "white", color: "#970747" }}><BiLogOut style={{ fontSize: "25px" }} /> Logout</button></li> */}
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
                style={{ backgroundColor: "#970747", color: "white" }}
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
                <div className="offcanvas-body">
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <Link
                            to={'/'}
                            className="nav-item"
                            style={{ textDecoration: "none", color: "white", paddingLeft: "40px" }}
                            onClick={() => {
                                document.querySelector('[data-bs-dismiss="offcanvas"]').click();
                            }}
                        >
                            <FaHome style={{ fontSize: "25px" }} /> Home
                        </Link>
                        <Link
                            to={'/dashboard'}
                            className="nav-item"
                            style={{ textDecoration: "none", color: "white", paddingLeft: "40px" }}
                            onClick={() => {
                                document.querySelector('[data-bs-dismiss="offcanvas"]').click();
                            }}
                        >
                            <MdDashboardCustomize style={{ fontSize: "25px" }} /> Your Dashboard
                        </Link>
                        {
                            props.signin ? <button className='btn' style={{ backgroundColor: "white", color: "#970747" }} onClick={() => {
                                document.querySelector('[data-bs-dismiss="offcanvas"]').click();
                                logout()
                            }}><BiLogOut style={{ fontSize: "25px" }} /> Logout</button> : <><Link
                                to={'/login'}
                                className="nav-item"
                                style={{ textDecoration: "none", color: "white", paddingLeft: "40px" }}
                                onClick={() => {
                                    document.querySelector('[data-bs-dismiss="offcanvas"]').click();
                                }}
                            >
                                <MdOutlineLogin style={{ fontSize: "25px" }} /> Login
                            </Link>
                                <Link
                                    to={'/register'}
                                    className="nav-item"
                                    style={{ textDecoration: "none", color: "white", paddingLeft: "40px" }}
                                    onClick={() => {
                                        document.querySelector('[data-bs-dismiss="offcanvas"]').click();
                                    }}
                                >
                                    <MdAccountBox style={{ fontSize: "25px" }} /> Register
                                </Link></>
                        }
                        {/* <Link
                            to={'/logout'}
                            className="nav-item"
                            style={{ textDecoration: "none", color: "white", paddingLeft: "40px" }}
                            onClick={() => {
                                document.querySelector('[data-bs-dismiss="offcanvas"]').click();
                            }}
                        >
                            <BiLogOut style={{fontSize:"25px"}}/> Logout
                        </Link> */}

                        {/* <button className='btn' style={{ backgroundColor: "white", color: "#970747" }} onClick={() => {
                            document.querySelector('[data-bs-dismiss="offcanvas"]').click();
                        }}><BiLogOut style={{ fontSize: "25px" }} /> Logout</button> */}

                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Navbar;