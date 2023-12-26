import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Type_Item = (props) => {
    let {name} = props;
    const Navigate = useNavigate();

    const onClick = () => {
        props.setIsForumThere(true);
        props.setSelectedType(name);
        props.fetchCategories();
    }

    return (
        <>
            <div onClick={onClick} className="type type_a">
                {name}
            </div>
        </>
    )
}

export default Type_Item
