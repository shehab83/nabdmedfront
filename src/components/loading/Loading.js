import React from 'react'
import "./loading.css"
function Loading(props) {
  return (
    <div className={`loading ${props.light}`}>
      <div className='load'>

      </div>
    </div>
  )
}

export default Loading