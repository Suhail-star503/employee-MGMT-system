import React from 'react';
import Style from './hero.module.css'; // CSS Module
// import { TypeAnimation } from 'react-type-animation';
import Navbar from '../Navbar/navbar';
import { Link } from 'react-router-dom';
import { MdManageAccounts } from "react-icons/md";
import { FaLaptop } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import Scroller from '../scroller/scroller';
import { IoMdMail } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Hero = (props) => {

    return (
        <>
            <Navbar signin={props.signin} setsignin={props.setsignin} />
            <div className="container" style={{ marginTop: "10px", display: "flex", paddingTop: "200px", justifyContent: "center", alignItems: "center" }}>
                <div className="row gy-5">
                    <div className={`col-12 col-lg-6 ${Style.herotext}`}>
                        
                        <h1>
                            A platform that <span style={{ color: "#ffd900" }}>helps employees and admins to manage their work easily</span> and saves a lot of time.
                        </h1>
                        <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
                            <Link to={'/dashboard'}>
                                <button className='btn' style={{ backgroundColor: '#ffd900', color: "black", fontWeight: "bold", padding: "10px 10px", borderRadius: "20px" }}>
                                    Go to the dashboard
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                        <img
                            src="https://cdn.pixabay.com/photo/2019/03/21/15/49/work-4071264_1280.png"
                            alt="Business visual"
                            className={`img-fluid ${Style.heroimg}`}
                        />
                    </div>
                </div>
            </div>
            <div className="container" style={{ marginTop: "100px" }}>
                <h1 style={{ textAlign: "center", color: "white", margin: "10px 0px 20px 0px" }}>Features</h1>
                <div className="row">
                    <div className={`col col-11 col-lg-3 ${Style.onhover}`} style={{ padding: "10px 0px", borderRadius: "20px", backgroundColor: "rgb(55 65 81 )", margin: "15px auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div style={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <MdManageAccounts style={{ fontSize: "80px", color: "#ffd900" }} />
                        </div>
                        <h3 style={{ color: "white", textAlign: "center" }}>For employees</h3>
                        <ol style={{ color: "white", listStyleType: "disc" }}>
                            <li>
                                Ability to join any company with the help of an unique company id that is provided by your company admin.
                            </li>
                            <li>
                                You can check your task that is given to you by your company and try to complete this tast on time.
                            </li>
                            <li>
                                You can check your current salary that is mentioned by your company.
                            </li>
                        </ol>
                    </div>
                    <div className={`col col-11 col-lg-3 ${Style.onhover}`} style={{ height: "500px", borderRadius: "20px", backgroundColor: "rgb(55 65 81 )", margin: "15px auto" }}>
                        <div style={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <FaLaptop style={{ fontSize: "80px", color: "#ffd900" }} />
                        </div>
                        <h3 style={{ color: "white", textAlign: "center" }}>For admin</h3>
                        <ol style={{ color: "white", listStyleType: "disc" }}>
                            <li>
                                Ability to give task to their employees and update salary of the employee according to the task's completion status.
                            </li>
                            <li>
                                We will provide you your all employees data, so that you can easily manage your employees.
                            </li>
                            <li>
                                We will also provide a data that represent your total expenses on employees salaries.
                            </li>
                        </ol>
                    </div>
                    <div className={`col col-11 col-lg-3 ${Style.onhover}`} style={{ height: "500px", borderRadius: "20px", backgroundColor: "rgb(55 65 81 )", margin: "15px auto" }}>
                        <div style={{ height: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <FaClipboardList style={{ fontSize: "80px", color: "#ffd900" }} />
                        </div>
                        <h3 style={{ color: "white", textAlign: "center" }}>Over all</h3>
                        <ol style={{ color: "white", listStyleType: "disc" }}>
                            <li>
                                Totally free to use. You can use this web system without any kind of payment with our 24 hours customer support team
                            </li>
                            <li>
                                It makes your work life very easy. Almost half of your work is completed by our team, that is realy so good
                            </li>
                            <li>
                                It saves your lot of time while your busy life.
                            </li>
                        </ol>

                    </div>
                </div>
            </div>
            <h1 style={{ color: "white", textAlign: "center", margin: "50px 0px" }}>Our happy users</h1>
            <Scroller />
            <div className="container" style={{ marginTop: "60px" }}>
                <div className="row">
                    <div className="col col-11 col-lg-8" style={{ margin: "10px auto" }}>
                        <hr style={{
                            width: "100px",
                            height: "7px",
                            backgroundColor: "#ffd900",
                            border: "none"
                        }} />
                        <h2 style={{ color: "#ffd900" }}>Best platform in your busy life is now available with free of cost, Sign Up </h2>
                    </div>
                    <div className="col col-11 col-lg-3" style={{ margin: "10px auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Link to={'/register'}>
                            <button className='btn' style={{ backgroundColor: '#ffd900', color: "black", fontWeight: "bold", padding: "20px 30px", borderRadius: "20px" }}>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <h2 style={{ color: "white", textAlign: "center", margin: "50px 0px" }}>Contact Us</h2>
            <div className="container">
                <div className="row">

                    <div className={`col-11 col-lg-8 ${Style.contact}`}>
                        <div>
                            <h5 style={{ color: "black", margin: "20px 0px", color: "white" }}>Want to connect with us? Feel free to share SMS and Gmail. Our team is ready to solve your doubts and problems. We are available for 24 hours.</h5>
                        </div>
                        <div style={{ width: "50%", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
                            <IoMdMail style={{ fontSize: "70px" }} />

                        </div>
                        <p style={{ color: "white" }}><b>Gmail at</b> : suhail20031109@gmail.com</p>
                        <div style={{ width: "50%", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "10px" }}>
                            <FaWhatsapp style={{ fontSize: "70px" }} />

                        </div>
                        <p style={{ color: "white" }}><b>WhatsApp at </b> : +91 8766311237</p>
                        <div>
                            <p style={{ color: "white" }}><b>Created with <FaHeart style={{ color: "red" }} /> by Suhail, connect with Suhail on</b> : <a href="https://www.linkedin.com/in/mohammad-suhail-316586316/" rel="noopener noreferrer" style={{ color: "#ffd900" }}>LinkedIn</a>, <a href="https://www.instagram.com/technicalsuhail01?igsh=NmZ6eDIxbGQwdnFs" rel="noopener noreferrer" style={{ color: "#ffd900" }}>Instagram</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={Style.footer}>
                <p style={{ color: "white", textAlign: "center", padding: "20px 0px" }}>© 2025 Assistora</p>
            </div>
        </>
    );
}

export default Hero;
