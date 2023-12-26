import React from 'react'
import { useNavigate } from 'react-router-dom';

const MobileCatList = (props) => {

    const Navigate = useNavigate();
    const { name } = props;

    const onClick = () => {
        props.setSelectedCategory(name)
        Navigate("/Questions")
    }
  return (
    <div>
      <div onClick={onClick} className="list-i">
            {name}
        </div>
    </div>
  )
}

export default MobileCatList
