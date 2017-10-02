import React from 'react';

import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem
} from 'react-bootstrap';

export default ({title = ''}) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        {title}
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
    <NavDropdown eventKey={3} title="Add" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Manually</MenuItem>
        <MenuItem eventKey={3.2}>From Map</MenuItem>
      </NavDropdown>
      <NavItem eventKey={1}>Edit</NavItem>
      <NavItem eventKey={2}>Delete</NavItem>
    </Nav>
  </Navbar>
)