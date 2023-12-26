import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionItem = (props) => {

    const {name, type, category, username} = props;

    const Navigate = useNavigate();

    const onClick = () => {
        Navigate("/answers");
        props.setSelectedQuestion(name);
    }
    
    return (
        <div class="content-list">
            {name}
            <div class="btn-show-answers">
                <button onClick={onClick} className="btn-answers-show">View Answers</button>
                <p>by <span>{username}</span></p>
            </div>
        </div>
    )
}

export default QuestionItem
