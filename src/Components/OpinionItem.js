import React from 'react'

const OpinionItem = (props) => {
    const {username, name} = props;
  return (
    <>
        <div class="content-list">
               {name}

                    <p className='answer_by'>by <span>{username}</span></p>
            </div>
        </>
  )
}

export default OpinionItem
