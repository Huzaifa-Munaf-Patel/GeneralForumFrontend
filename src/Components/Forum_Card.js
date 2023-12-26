import React from 'react'
import { useNavigate } from 'react-router-dom';

const Forum_Card = (props) => {
    const {name, description, type} = props;

    const Navigate = useNavigate();

    const onClick = () => {
        props.setSelectedType(type);
        props.setSelectedCategory(name);
        Navigate("/Questions");
    }
    return (
            <div className="card" style={{ width: "17rem" }}>
                <img src={`https://source.unsplash.com/150x70/?${name}`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <button onClick={onClick} className="btn btn-primary">Access Forum</button>
                </div>
            </div>
    )
}

export default Forum_Card
