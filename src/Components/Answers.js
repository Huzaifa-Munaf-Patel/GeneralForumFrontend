import React, { useEffect, useState } from 'react'
import QuestionItemList from './QuestionItemList';
import AnswerItem from './AnswerItem';
import { useNavigate } from 'react-router-dom';

const Answers = (props) => {

    const Navigate = useNavigate();

    const [isAnswerThere, setIsAnswerThere] = useState(true);
    const [questionItems, setQuestionItems] = useState([]);
    const [Answers, setAnswers] = useState([]);
    const [Credentials, setCredentials] = useState({name:""});
    const {showAlert, setProgress} = props;
    const [isTypeLoaded, setIsTypeLoaded] = useState(false);
    const [isAnswersLoaded, setIsAnswersLoaded] = useState(false);

    const fetchQuestionItems = async () => {
        const response = await fetch("https://myforum-d97p.onrender.com/getQuestions",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({category:props.selectedCategory})
        })

        const json = await response.json();
        setIsTypeLoaded(true);
        setQuestionItems(json);
    }

    const fetchAnswers = async () => {
        const response = await fetch("https://myforum-d97p.onrender.com/getAnswers",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({question:props.selectedQuestion})
        })

        const json = await response.json();
        if(json[0]){
            setIsAnswerThere(true);
        }else{
            setIsAnswerThere(false);
        }
        setIsAnswersLoaded(true);
        setAnswers(json);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if(localStorage.getItem("user") == null || localStorage.getItem("username") == null){
            showAlert("danger","Please Login to use General Forum");
        }else{
            const {name} = Credentials;
            if(name==""){
                showAlert("danger","please fill Something")
            }else{
                setProgress(10);
                const user = localStorage.getItem("user");
                const username = localStorage.getItem("username");
                const type = props.selectedType;
                const category = props.selectedCategory;
                const question = props.selectedQuestion;
        
                const response = await fetch("https://myforum-d97p.onrender.com/addAnswers",{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify({name,user,username,type,category,question})
                })
                setProgress(50);
                const json = await response.json();
                showAlert("success","Your answer has been posted Successfully")
                fetchAnswers();
                setProgress(100);
            }
        }
    }

    const onChange = (e) => {
        setCredentials({...Credentials,[e.target.name]:e.target.value})
    }

    const onClick = () => {
        const name = document.getElementById("name2");
        name.value = "";
    }

    useEffect(() => {
        fetchAnswers();
    }, );

    useEffect(() => {
        fetchQuestionItems();
    },[]);

     const ansSortClick = () => {
         props.setSelectedMobileMenuOption("Questions");
         props.setSelectedCategory(props.selectedCategory);
         Navigate("/mobile-menu")
    }

  return (
    <>
    <span onClick={ansSortClick} id='sort-btn' class="sort-btn material-symbols-outlined">
                sort
    </span>
    {/* <!-- Category Menu Starts here --> */}
    <div class="category-menu">
        <div class="cat-menu-list">
  
          {isTypeLoaded ? questionItems.map((questionItems) => {
            return <QuestionItemList setIsAnswerThere={setIsAnswerThere} fetchAnswers={fetchAnswers} setSelectedQuestion={props.setSelectedQuestion} name={questionItems.name}/>
          }): "Please Wait until the data is Loaded..."}
  
        </div>
      </div>
      {/* <!-- Category Menu ends here --> */}

      {/* <!-- Categories Starts here --> */}
    <div class="categories">
        <div class="category-box">
            <div class="category-heading">
                <h1 className='AnswerHeading'>{isAnswerThere ? "Answers related to:": "Be the First One to answer this Question"} <small className='smallAnswer'>{isAnswerThere && props.selectedQuestion}</small></h1>
            </div>

            <div class="content1">
                {isAnswersLoaded ? isAnswerThere ? Answers.map((Answers)=>{
                    return <AnswerItem name={Answers.name} username={Answers.username}/>
                }): "There are no Answers related to "+'"'+props.selectedQuestion+'"'+" yet": "Please Wait until the data is Loaded..."}
            </div>
  
        </div>
    </div>
    {/* <!-- Categories ends here --> */}

    {/* <!-- Categories Starts here --> */}
    <div class="categories input-box">
        <div class="category-box">
            <div class="category-heading">
                <h1>Give your Answer</h1>
            </div>
            <form onSubmit={handleOnSubmit}>

                <div class="form-floating">
                    <textarea onChange={onChange} className="form-control" name='name' placeholder="Leave a comment here" id="name2" style={{height: "120px"}}></textarea>
                    <label for="floatingTextarea2">Give your Answer</label>
                  </div>

                <button onClick={onClick} style={{marginTop: "10px"}} type="submit" class="btn btn-primary">Submit</button>
              </form>
        </div>
    </div>
    {/* <!-- Categories ends here --> */}
    </>
  )
}

export default Answers
