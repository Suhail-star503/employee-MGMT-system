import React from 'react';
import Style from './hero.module.css';
import { TypeAnimation } from 'react-type-animation';
import Navbar from '../Navbar/navbar';
import { Link } from 'react-router-dom';
const Hero = (props) => {
    return (
        <>
        <Navbar signin={props.signin} setsignin={props.setsignin}/>
        <div className="container" style={{ marginTop: "10px", display: "flex", height: "80vh", justifyContent: "center", alignItems: "center" }}>
            <div className="row gy-5">
                <div className={`col-12 col-lg-6 ${Style.herotext}`}>
                    <TypeAnimation
                        sequence={[
                            'We provide an employee management system that helps you manage your employees.',
                            1000, // Wait 1 second before displaying the next phrase
                            'We provide an employee management system that helps you manage salary of your employees.',
                            1000,
                            'We provide an employee management system that helps you manage promotions of your employees.',
                            1000,
                            'We provide an employee management system that helps you manage tasks of your employees',
                            1000
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ fontSize: '2em', display: 'inline-block' }}
                        repeat={Infinity}
                    />
                    <div style={{
                        display: "flex", gap: "20px", marginTop: "30px"
                    }}>
                        <Link to={'/dashboard'}><button className='btn' style={{backgroundColor:'#970747',color:"white"}}>Go to the dashboard</button></Link>
                        
                    </div>
                </div>
                <div className={`col-12 col-lg-6 ${Style.heroimg}`}>
                    <img src="https://cdn.pixabay.com/photo/2023/01/26/08/21/business-7745315_1280.png" className="img-fluid" alt="Business visual" />
                </div>
            </div>
        </div>
        </>
    );
}

export default Hero;