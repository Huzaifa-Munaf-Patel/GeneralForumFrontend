import React, { useEffect, useState } from 'react'
import Type_Item from './Type_Item';
import Forum_Card from './Forum_Card';
import { useNavigate } from 'react-router-dom';

const Categories = (props) => {
    const [isForumThere, setIsForumThere] = useState(true);
    const Navigate = useNavigate();
    const [Categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [isTypeloaded, setIsTypeLoaded] = useState(false);
    const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);
    

    const fetchTypes = async () => {
        try {
            const response = await fetch("https://myforum-d97p.onrender.com/getTypes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const json = await response.json();
            setTypes(json);
            console.log(json);
            setIsTypeLoaded(true);
        } catch (error) {
            props.showAlert("danger", "Please check your Internet Connection");
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await fetch("https://myforum-d97p.onrender.com/getCategories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ type: props.selectedType })
            })

            const json = await response.json();
            setIsCategoryLoaded(true);
            setCategories(json);

            if(!json[0]){
                setIsForumThere(false);
            }else{
                setIsForumThere(true);
            }

        } catch (error) {
            props.showAlert("danger", "Please check your Internet Connection");
        }
    }


    useEffect(() => {
        fetchTypes();
    }, []);

    useEffect(() => {
        fetchCategories();
    },);

    const onClick = () => {
        const user = localStorage.getItem("user");
        const username = localStorage.getItem("username");
        if (user == null || username == null) {
            props.showAlert("danger", "Please Login to create a Forum");
        } else {
            Navigate("/createForum");
        }
    }

    const sortClick = () => {
        Navigate("/mobile-menu");
        props.setSelectedMobileMenuOption("type");
    }

    return (
        <div>
            <span onClick={sortClick} id='sort-btn' class="sort-btn material-symbols-outlined">
                sort
            </span>

            <div>
                <div class="category-menu">
                    <div class="cat-menu-list">
                        <span class="material-symbols-outlined" id="close-menu-btn">close</span>

                        {isTypeloaded ? types.map((types) => {
                            return <Type_Item setIsForumThere={setIsForumThere} setProgress={props.setProgress} setSelectedType={props.setSelectedType} fetchCategories={fetchCategories} name={types.name} />
                        }) : "Please Wait until the data is Loaded..."}

                    </div>
                </div>

            </div>

            <div class="categories">
                <div class="category-box">
                    <div class="category-heading">
                        <h1>{isForumThere ? "Here are the Forums related to " + props.selectedType : "Be the first one to create a forum"}</h1>
                    </div>

                    <div class="list-heading">
                        <div class="option-buttons bb">
                            <button onClick={onClick}>{"Create your Own Forum Related to " + props.selectedType}</button>
                        </div>
                    </div>

                    <div class="row mx-2">

                        {isCategoryLoaded ? isForumThere ? Categories.map((Categories) => {
                            return <Forum_Card name={Categories.name} setSelectedCategory={props.setSelectedCategory} type={Categories.type} setSelectedType={props.setSelectedType} description={Categories.description} />
                        }) :"There are no forums related to "+props.selectedType+" yet..." : "Please wait until the data is loaded..."}



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories
