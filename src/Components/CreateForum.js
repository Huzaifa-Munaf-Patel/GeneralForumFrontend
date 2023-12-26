import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateForum = (props) => {

    const Navigate = useNavigate();

    const [Credentials, setCredentials] = useState({name:"",description:""});

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        
        const {name,description} = Credentials;
        const user = localStorage.getItem("user");
        const username = localStorage.getItem("username");
        const type = props.selectedType;
        props.setProgress(20);
        const response = await fetch("https://myforum-d97p.onrender.com/addCategories",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({name, description, user, username, type})
        })
        props.setProgress(50);
        const json = await response.json();
        console.log(json);
        props.showAlert("success","Your Forum has been created successfully");
        props.setSelectedType(props.selectedType);
        props.setProgress(100);
        Navigate("/categories");
    }

    const onChange = (e) => {
        setCredentials({...Credentials,[e.target.name]:e.target.value});
    }

    return (
        <div>
            <div class="categories a">
                <div class="category-box">
                    <div class="category-heading">
                        <h1>{"Create your own Forum Related to "+props.selectedType}</h1>
                    </div>

                    <form onSubmit={handleOnSubmit}>

                        <div class="form-floating">
                            
                            <input required type="text" className='form-control' style={{ height: "60px", marginBottom: "1rem" }} name='name' id='id' onChange={onChange}/>
                            <label style={{fontSize: "1.2rem"}} htmlFor="name">Forum's Name</label>
                        </div>

                        <div class="form-floating">
                            <textarea required className="form-control" name='description' onChange={onChange} placeholder="Leave a comment here" id="name" style={{ height: "120px" }}></textarea>
                            <label for="floatingTextarea2">Describe your Forum</label>
                        </div>

                        <button style={{ marginTop: "10px" }} type="submit" class="btn btn-primary">Create Forum</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default CreateForum
