import React from 'react'

const AnswerItem = (props) => {
    const {name, username} = props;
    return (
        <>
            <div class="content-list">
               {name}

                    <p className='answer_by'>by <span>{username}</span></p>
            </div>
        </>
    )
}

export default AnswerItem
