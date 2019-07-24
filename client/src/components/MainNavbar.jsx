import React, { useState } from 'react'
import api from '../api'
import logo from '../logo.svg'
import { Link, NavLink as NLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

function MainNavbar(props) {
  const [isOpen, setIsOpen] = useState(false)
  function toggle() {
    setIsOpen(!isOpen)
  }
  function handleLogoutClick(e) {
    api.logout()
  }
  const links = [
    { to: '/list', text: 'List' },
    { to: '/map', text: 'Map' },
    { to: '/new-street-art', text: 'New Street Art' },
  ]
  if (!api.isLoggedIn()) {
    links.push({ to: '/signup', text: 'Signup' })
    links.push({ to: '/login', text: 'Login' })
  }
  if (api.isLoggedIn()) {
    links.push({ to: '/', text: 'Logout', onClick: handleLogoutClick })
  }
  return (
    <Navbar color="danger" dark expand="sm">
      <NavbarBrand tag={Link} to="/">
        MERN Street Art
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {links.map(link => (
            <NavItem key={link.to}>
              <NavLink tag={NLink} to={link.to} exact onClick={link.onClick}>
                {link.text}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default withRouter(MainNavbar)
