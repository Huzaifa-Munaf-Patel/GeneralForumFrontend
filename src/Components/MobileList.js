import React from 'react'
import { useNavigate } from 'react-router-dom';

const MobileList = (props) => {
    const Navigate = useNavigate();
    const { name } = props;

    const onClick = () => {
        props.setSelectedType(name)
        Navigate("/Categories")
    }
    return (
        <div onClick={onClick} className="list-i">
            {name}
        </div>
    )
}

export default MobileList
