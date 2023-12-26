import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = (props) => {

    const {showAlert, setProgress} = props;

    const Navigate = useNavigate();

    const [Credentials, setCredentials] = useState({email:"", password:""})

    const fetchUser = async (email) => {
        const response = await fetch("https://myforum-d97p.onrender.com/getUsers", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({email})
        })
        const json = await response.json();
        console.log(json.name)
        localStorage.setItem("username",json.name);
    }

    const handleOnSubmit = async (e) => {
        const {email,password} = Credentials;
        e.preventDefault();
        setProgress(15)
        const response = await fetch("https://myforum-d97p.onrender.com/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({email,password})
        })
        setProgress(50)
        const json = await response.json();
        if(json === "Invalid Credentials"){
            showAlert("danger","Invalid Credentials");
            setProgress(100)
        }else{
            showAlert("success", "You are logged in!!!");
            localStorage.setItem("user",json.email);
            fetchUser(localStorage.getItem("user"));
            setProgress(100)
            Navigate("/");
        }
    }


    const onChange = (e) => {
        setCredentials({...Credentials,[e.target.name]:e.target.value})
    }
  return (
    <>
    <div class="form" onSubmit={handleOnSubmit}>
        <form action="">
            <h2>Login to use General Forum</h2>
            <div class="input-field">
                <label for="name">Enter your Email Adress</label>
                <input type="email" required onChange={onChange} name="email" id="email"/>
            </div>

            <div class="input-field">
                <label for="name">Enter your Password</label>
                <input type="password" required onChange={onChange} name="password" id="password"/>
            </div>
            <button class="form-btn" type="submit">Login</button>
        </form>
    </div>
    </>
  )
}

export default Login
