import React from 'react'

const Alert = (props) => {
    return (
        <>
        {
         props.alert && <div class={`alert alert-${props.alert.type} alert-dismissible fixed-top alert-head fade show`} role="alert">
            <strong>{props.alert.type == "danger" ? "Error": props.alert.type}</strong> {props.alert.message}
        </div>
        }
        </>
            
    )
}

export default Alert
