import React, { useState } from 'react'
import { Button } from 'styled-button-component'
import { Navbar, NavbarLink } from 'styled-navbar-component'
import { Nav } from 'styled-nav-component'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/user'

export const NavbarLight = () => {
  const [hidden, setHidden] = useState(true)
  const dispatch = useDispatch()

  return (
    <Navbar expandLg light id='mainnavbar'>
      <Nav start>
        <Link to='/home'>
          <NavbarLink light brand>HEART PIX.</NavbarLink>
        </Link>
        <Nav end>
          <Button
            light
            outline
            toggleCollapse
            expandSm
            onClick={() => setHidden(!hidden)}
          >
            <span>&#9776;</span>
          </Button>
        </Nav>
      </Nav>
      <Nav start collapse expandSm hidden={hidden} id='subnavbar'>
        <Link to='/home'>
          <NavbarLink light active>Ongoing Polls</NavbarLink>
        </Link>
        <Link to='/addpoll'>
          <NavbarLink light active>Create a Poll</NavbarLink>
        </Link>
        <Link to='/mypage'>
          <NavbarLink light active>My Page</NavbarLink>
        </Link>
        <Link to='/about'>
          <NavbarLink light active>About</NavbarLink>
        </Link>
        <Link to='/login'>
          <NavbarLink light active onClick={() => dispatch(logout())}>Log Out</NavbarLink>
        </Link>
      </Nav>
    </Navbar>
  );
};

export default NavbarLight