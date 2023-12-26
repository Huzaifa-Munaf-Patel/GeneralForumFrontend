import React from 'react'
import {Link} from "react-router-dom";

const Navbar = () => {
    
    const onClick = () => {
       const header = document.querySelector("header")

       header.classList.toggle("show-mobile-menu");
    }

    const oncloseClick = () => {
        const menuBtn = document.querySelector(".menu-icon");
        menuBtn.click();
    }

    const LinkClick = () => {
        const menuBtn = document.querySelector(".menu-icon");
        menuBtn.click();
    }


  return (
    <header>
        <div class="navbar fixed-top">
            <div>
                <Link to="/" class="logo">GeneralForums</Link>
            </div>

            <ul id='menu-links' class='menu-links'>
                <span onClick={oncloseClick} class="material-symbols-outlined" id="close-menu-btn">close</span>
                
                    <Link onClick={LinkClick} to="/login" class="login-btn auth-btn ba">Login</Link>
                    <Link onClick={LinkClick} to="/signup" class="signup-btn auth-btn ba">Signup</Link>
                
                <li><Link onClick={LinkClick} to="/">Home</Link></li>
                <li><Link onClick={LinkClick} to="/categories">Forums</Link></li>
                <li><a onClick={LinkClick} href="#About2">About</a></li>
                <li><a onClick={LinkClick} href="#Contact">Contact</a></li>
                <li><a onClick={LinkClick} href="#footer">Developers</a></li>
            </ul>
            

            <div class="auth-buttons b">
                <Link to="/login" class="login-btn auth-btn">Login</Link>
                <Link to="/signup" class="signup-btn auth-btn">Signup</Link>
            </div>

            <div onClick={onClick} class="menu-icon">
                <span class="material-symbols-outlined">menu</span>
            </div>
        </div>
    </header>
  )
}

export default Navbar
