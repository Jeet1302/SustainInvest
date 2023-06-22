import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const HandleLogout = () => {
        console.log("logout")
        localStorage.removeItem('token')
        navigate("/login");
    }
    return (
        <div className='navbar navbar-expand-sm   navbar-light ' style={{justifyContent:"space-between"}}>
            <img src="/img/army-seva.png" style={{ width: "20%",marginLeft:"20px" }}></img>
            <div className="">
                <ul className="navbar-nav " style={{fontSize: "20px",marginRight:"25px"}}>
                    <li className="nav-item fw-bold ">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item fw-bold">
                        <Link className={`nav-link ${location.pathname === "/blogs" ? "active" : ""}`} to="/blogs">Blogs</Link>
                    </li>
                    <li className="nav-item fw-bold">
                        <Link className={`nav-link ${location.pathname === "/jobs" ? "active" : ""}`} to="/jobs">Jobs</Link>
                    </li>
                    <li className="nav-item fw-bold">
                        <Link className={`nav-link ${location.pathname === "/news" ? "active" : ""}`} to="/news">News</Link>
                    </li>
                    <li className="nav-item fw-bold">
                        <Link className={`nav-link ${location.pathname === "/donations" ? "active" : ""}`} to="/donations">Donations</Link>
                    </li>

                    <li className="nav-item fw-bold">
                        <Link className={`nav-link ${location.pathname === "/pension" ? "active" : ""}`} to="/pension">Pension</Link>
                    </li>
                    {
                        !localStorage.getItem('token') ? <><li className='nav-item'>
                            <Link className='nav-link' to='/login'>Login</Link>
                        </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/signup'>Signup</Link>
                            </li></>
                            :
                            <li className="nav-item">
                                <Link className="nav-link fw-bold" onClick={HandleLogout}>Logout</Link>
                            </li>
                    }
                </ul>
            </div>
        </div >

    )
}