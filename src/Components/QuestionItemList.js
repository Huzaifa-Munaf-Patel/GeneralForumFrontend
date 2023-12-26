import React from 'react'
import { useNavigate } from 'react-router-dom';

const QuestionItemList = (props) => {
    const Navigate = useNavigate();
    const {name, setSelectedQuestion,fetchAnswers} = props;

    const onClick = () => {
        props.setIsAnswerThere(true);
        setSelectedQuestion(name);
        fetchAnswers();
        Navigate("/answers")
    }
    return (
        <div onClick={onClick} class="type type_a">
            {name}
        </div>
    )
}

export default QuestionItemList
