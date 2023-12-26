import React from 'react'
import { useNavigate } from 'react-router-dom';

const MobileQuesList = (props) => {

  const Navigate = useNavigate();

  const { name, setSelectedQuestion } = props;

  const onClick = () => {
    setSelectedQuestion(name);
    Navigate("/answers");
  }


  return (
    <div>
      <div onClick={onClick} className="list-i body-btn">
        {name}
      </div>
    </div>
  )
}

export default MobileQuesList
