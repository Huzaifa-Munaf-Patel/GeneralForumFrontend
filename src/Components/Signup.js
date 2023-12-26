import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const {showAlert, setProgress} = props;

    const Navigate = useNavigate();

    const [Credentials, setCredentials] = useState({name:"",email:"",password:"",Cpassword:""});


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password,Cpassword} = Credentials;

        if(password==Cpassword){
            setProgress(10);
            const response = await fetch("https://myforum-d97p.onrender.com/createuser",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({name,email,password})
        })
        setProgress(50);

        const json = await response.json();
        console.log(json);
        setProgress(100)

        if(json=="That Email Exist!!!"){
            showAlert("danger","That user Exist!!!")
        }else{
        showAlert("success","Account Created Successfully, you are logged in");
        Navigate("/");
        localStorage.setItem("user", json.email);
        localStorage.setItem("username", json.name);
        }
        }else{
            showAlert("danger","Your passwords Does not match");
        }

    }

    const onChange = (e) => {
        setCredentials({...Credentials,[e.target.name]:e.target.value});
    }

  return (
    <div>
      <div onSubmit={handleOnSubmit} class="form">
        <form action="">
            <h2>Create an account to use General Forum</h2>
            <div class="input-field">
                <label for="name">Enter your name</label>
                <input required type="text" onChange={onChange} name="name" id="name"/>
            </div>

            <div class="input-field">
                <label for="email">Enter your Email Adress</label>
                <input required type="email" onChange={onChange} name="email" id="email"/>
            </div>

            <div class="input-field">
                <label for="name">Create a Password</label>
                <input required type="password" onChange={onChange} name="password" id="password"/>
            </div>

            <div class="input-field">
                <label for="name">Confirm Your Password</label>
                <input required type="password" onChange={onChange} name="Cpassword" id="Cpassword"/>
            </div>
            <button class="form-btn" type="submit">Create Account</button>
        </form>
    </div>
    </div>
  )
}

export default Signup
