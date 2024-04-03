import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <ul className='mb-4 flex gap-4'>
        <Link to = '/'>Entry</Link>
        <Link to = '/profile'>Profile</Link>
        <Link to = '/list'>List</Link>
    </ul>
  )
}

export default Navbar