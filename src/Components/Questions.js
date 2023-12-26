import React, { useEffect, useState } from 'react'
import Forum_type_item from './Forum_type_item';
import QuestionItem from './QuestionItem';
import OpinionItem from './OpinionItem';
import { useNavigate } from 'react-router-dom';

const Questions = (props) => {

    const Navigate = useNavigate();

    const [isQuestionThere, setIsQuestionThere] = useState(true);
    const [isOpinionThere, setIsOpinionThere] = useState(true);
    const [forumItems, setForumItems] = useState([]);
    const [Questions, setQuestions] = useState([]);
    const [Opinions, setOpinions] = useState([]);
    const { setSelectedCategory, selectedType, selectedCategory, showAlert, setSelectedMobileMenuOption, selectedOption, setSelectedOption, setProgress } = props;
    const [Credentials, setCredentials] = useState({ name: "" });
    const [OpinionCredentials, setOpinionCredentials] = useState({ name: "" });
    const [isTypeloaded, setIsTypeLoaded] = useState(false);
    const [isQuestionsLoaded, setIsQuestionsLoaded] = useState(false);
    const [isOpinionsLoaded, setIsOpinionsLoaded] = useState(false);

    const fetchForumItems = async () => {
        const response = await fetch("https://myforum-d97p.onrender.com/getCategories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ type: selectedType })
        })
        const json = await response.json();
        setIsTypeLoaded(true);
        setForumItems(json);
    }

    const fetchQuestions = async () => {
        const response = await fetch("https://myforum-d97p.onrender.com/getQuestions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category: selectedCategory })
        })
        const json = await response.json();
        console.log(json);
        setIsQuestionsLoaded(true);
        if (json[0]) {
            setIsQuestionThere(true);
        } else {
            setIsQuestionThere(false)
        }
        setQuestions(json);
    }




    useEffect(() => {
        fetchForumItems();
    }, []);

    useEffect(() => {
        fetchQuestions();
    },);

    useEffect(() => {
        fetchOpinions();
    }, []);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const { name } = Credentials;

        if (localStorage.getItem("user") == null || localStorage.getItem("username") == null) {
            alert("Please Login to use General Forum")
            showAlert("danger", "Please Login to use General Forum")
        } else {
            if (name != "") {
                const user = localStorage.getItem("user");
                const username = localStorage.getItem("username");
                const type = selectedType;
                const category = selectedCategory;
                setProgress(10);
                const response = await fetch("https://myforum-d97p.onrender.com/addQuestions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, user, username, type, category })
                })
                setProgress(50);

                const json = await response.json();
                props.showAlert("success", "Your Question is posted successfully")
                fetchQuestions();
                setProgress(100);
            } else {
                props.showAlert("danger", "Questions field Cannot remain Empty")
            }

        }
    }

    const fetchOpinions = async () => {
        const response = await fetch("https://myforum-d97p.onrender.com/getOpinions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category: selectedCategory })
        })

        const json = await response.json();
        setIsOpinionsLoaded(true);
        if (json[0]) {
            setIsOpinionThere(true);
        } else {
            setIsOpinionThere(false);
        }
        setOpinions(json);
    }

    const onChange = (e) => {
        setCredentials({ ...Credentials, [e.target.name]: e.target.value });
    }

    const onClick = () => {
        const name = document.getElementById("name");

        name.value = "";
    }

    const OpinionsClick = () => {
        setSelectedOption("Opinions");
        fetchOpinions();
    }

    const QuestionsClick = () => {
        setSelectedOption("Questions");
    }

    const OpinionSubmit = async (e) => {
        e.preventDefault();

        try {
            const { name } = OpinionCredentials;
            const category = selectedCategory;
            const user = localStorage.getItem("user");
            const username = localStorage.getItem("username");
            if (user == null || username == null) {
                showAlert("danger", "Please Login to share your Opinion")
            } else {
                if (name != "") {
                    props.setProgress(20);
                    const response = await fetch("https://myforum-d97p.onrender.com/addOpinion", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ name, category, user, username })
                    })
                    setProgress(50);
                    const json = response.json();
                    props.showAlert("success", "Your Opinion has been posted");
                    fetchOpinions();
                    setProgress(100);
                } else {
                    props.showAlert("danger", "Opinion Field Cannot Remain Empty")
                }
            }
        } catch (error) {
            props.showAlert("danger", "Please check your Internet Connection")
        }
    }

    const OpinionChange = (e) => {
        setOpinionCredentials({ ...OpinionCredentials, [e.target.name]: e.target.value });
    }

    const sortClick = () => {
        setSelectedMobileMenuOption("Categories");
        setSelectedCategory(selectedCategory);
        Navigate("/mobile-menu");
    }

    return (
        <div>
            <span onClick={sortClick} id='sort-btn' class="sort-btn material-symbols-outlined">
                sort
            </span>
            <div class="category-menu">
                <div class="cat-menu-list">

                    {isTypeloaded ? forumItems.map((item) => {
                        return <Forum_type_item setIsOpinionThere={setIsOpinionThere} setIsQuestionThere={setIsQuestionThere} setProgress={setProgress} name={item.name} setSelectedOption={setSelectedOption} fetchQuestions={fetchQuestions} setSelectedCategory={props.setSelectedCategory} />
                    }) : "Please Wait until the data is Loaded..."}

                </div>
            </div>

            {/* Place where users will see Questions Starts Here */}
            <div class="categories">
                <div class="category-box">
                    <div class="category-heading">
                        {
                            selectedOption == "Questions" ?
                                <h1>{isQuestionThere ? "Here are the Questions related to " + selectedCategory : "Be the first one to ask a Question"}</h1> :
                                <h1>{isOpinionThere ? "Here are the Opinions related to " + selectedCategory : "Be the first one to give an Opinion"}</h1>
                        }
                    </div>

                    <div class="list-heading">
                        <div class="option-buttons">
                            <button onClick={QuestionsClick}>Questions</button>
                            <button onClick={OpinionsClick}>Opinions</button>
                        </div>
                    </div>

                    <div className="content1">

                        {
                            selectedOption == "Questions" ?
                                isQuestionsLoaded ? isQuestionThere ? Questions.map((Questions) => {
                                    return <QuestionItem setProgress={setProgress} name={Questions.name} setSelectedQuestion={props.setSelectedQuestion} type={Questions.type} category={Questions.category} username={Questions.username} />
                                }) : "There are no Questions related to " + selectedCategory + " yet" : "Please Wait until the data is Loaded..."
                                :
                                isOpinionsLoaded ? isOpinionThere ? Opinions.map((Opinion) => {
                                    return <OpinionItem setProgress={setProgress} name={Opinion.name} username={Opinion.username} />
                                }) : "There are no Opinions related to " + selectedCategory + " yet" : "Please Wait until the data is Loaded..."
                        }

                    </div>
                </div>
            </div>
            {/* Place where users will see Questions ends Here */}

            {/* Place where user will enter ask their questions starts here */}
            <div class="categories input-box">
                <div class="category-box">
                    <div class="category-heading">
                        {
                            selectedOption == "Questions" ?
                                <h1>Ask a Question</h1>
                                :
                                <h1>Share your Opinion</h1>
                        }
                    </div>
                    <form onSubmit={selectedOption == "Questions" ? handleOnSubmit : OpinionSubmit}>

                        <div class="form-floating">
                            <textarea className="form-control" name='name' onChange={selectedOption == "Questions" ? onChange : OpinionChange} placeholder="Leave a comment here" id="name" style={{ height: "120px" }}></textarea>
                            <label for="floatingTextarea2">{selectedOption == "Questions" ? "Ask your Question" : "Give your Opinion"}</label>
                        </div>

                        <button onClick={onClick} style={{ marginTop: "10px" }} type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>

            {/* Place where user will enter ask their questions ends here */}
        </div>
    )
}

export default Questions
