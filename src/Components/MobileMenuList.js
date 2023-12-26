import React, { useEffect, useState } from 'react'
import MobileList from './MobileList';
import Categories from './Categories';
import MobileCatList from './MobileCatList';
import MobileQuesList from './MobileQuesList';

const MobileMenuList = (props) => {

    const { selectedMobileMenuOption, selectedType, selectedCategory, setSelectedQuestion, selectedOption, setSelectedOption } = props;

    const [types, setTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [Questions, setQuestions] = useState([]);
    const [Opinions, setOpinions] = useState([]);

    const fetchTypes = async () => {
        props.setProgress(10);
        const response = await fetch("https://myforum-d97p.onrender.com/getTypes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        props.setProgress(50);

        const json = await response.json();
        setTypes(json);
        console.log(json);
        props.setProgress(100);
    }

    const fetchCategories = async () => {
        const type = selectedType;
        props.setProgress(10);
        const response = await fetch("https://myforum-d97p.onrender.com/getCategories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ type })
        })
        props.setProgress(50);

        const json = await response.json();
        setCategories(json);
        console.log(json);
        props.setProgress(100);
    }

    const fetchQuestions = async () => {
        const response = await fetch("https://myforum-d97p.onrender.com/getQuestions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category: props.selectedCategory })
        })
        const json = await response.json();
        console.log(json);
        setQuestions(json);
    }

    const fetchOpinions = async () => {
        const response = await fetch("https://myforum-d97p.onrender.com/getOpinions", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({category:selectedCategory})
        })

        const json = await response.json();
        setOpinions(json);
    }

    useEffect(() => {
        fetchOpinions();
    }, []);

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        fetchTypes();
    }, [])

    useEffect(() => {
        fetchCategories();
    }, [])
    return (
        <>
            <div className="mobile-container">
                <div className="cont">

                    {
                        selectedMobileMenuOption == "type" &&
                        <h1 style={{color:"black", textAlign:"center"}}>Find Forums related to different Categories</h1>
                    }

                    {
                        selectedMobileMenuOption == "Categories" && 
                        <h1 style={{color:"black", textAlign:"center"}}>{"Other Forums related to " + selectedType}</h1>
                    }

                    {
                        selectedMobileMenuOption == "Questions" &&
                        <h1 style={{color:"black", textAlign:"center"}}>{"Other Questions related to " + selectedCategory}</h1>
                    }


                    {

                        selectedMobileMenuOption == "type" &&
                        types.map((types) => {
                            return <MobileList setSelectedType={props.setSelectedType} name={types.name} />
                        })
                    }

                    {
                        selectedMobileMenuOption == "Categories" &&
                        categories.map((categories) => {
                            return <MobileCatList setSelectedCategory={props.setSelectedCategory} name={categories.name} />
                        })
                    }

                    {
                        selectedMobileMenuOption == "Questions" &&
                        Questions.map((Questions) => {
                            return <MobileQuesList setSelectedQuestion={setSelectedQuestion} name={Questions.name} />
                        })
                    }


                </div>
            </div>
        </>
    )
}

export default MobileMenuList
