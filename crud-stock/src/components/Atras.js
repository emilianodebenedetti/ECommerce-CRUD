import React from 'react'
import { Link } from 'react-router-dom'

const Atras = () => {
  return (
    <div>
        <Link to='/'>
            <svg className='m-8' xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="m3.5 1.5l-3 3l3 3"/><path d="M.5 4.5h9a4 4 0 0 1 0 8h-5"/></g></svg>
        </Link>
    </div>
  )
}

export default Atras