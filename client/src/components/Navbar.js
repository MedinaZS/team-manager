import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='fs-5'>
        <NavLink to={'/players/list'} className='navbar-link pe-2 border-end border-dark border-2'>Manage Players</NavLink>
        <NavLink to={'/status/game/1'} className='ms-2 navbar-link'>Manage Player Status</NavLink>
    </div>
  )
}

export default Navbar