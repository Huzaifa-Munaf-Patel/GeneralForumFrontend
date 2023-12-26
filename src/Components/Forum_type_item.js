import React from 'react'
import { useNavigate } from "react-router-dom"

const Forum_type_item = (props) => {

  const {name} = props;

  const Navigate = useNavigate();

  const onClick = () => {
    props.setIsOpinionThere(true);
    props.setIsQuestionThere(true);
    props.setSelectedCategory(name);
    props.setSelectedOption("Questions");
    props.fetchQuestions();
    Navigate("/questions");
}

  return (
    <>
      <div onClick={onClick} className="type type_a">
        {name}
      </div>
    </>
  )
}

export default Forum_type_item
