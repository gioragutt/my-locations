import React from 'react';

import {
    Navbar as BsNavbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem
} from 'react-bootstrap';

const MenuNavItem = ({nav, navIndex, disabled}) => {
  return (
    <NavItem
      eventKey={navIndex}
      onClick={nav.onClick}
      disabled={disabled}
    >
      {nav.title}
    </NavItem>
  );
}

const MenuItems = ({items}) => {
  return items.map((item, index) => (
    <MenuNavItem
      nav={item}
      navIndex={index}
      key={`menu-item-${item.title}-${index}`}
      disabled={item.disabled}
    />
  ));
}

const Navbar = ({title = '', items = []}) => (
  <BsNavbar>
    <BsNavbar.Header>
      <BsNavbar.Brand>
        {title}
      </BsNavbar.Brand>
      <BsNavbar.Toggle />
    </BsNavbar.Header>
    <BsNavbar.Collapse>
      <Nav>
        <MenuItems items={items} />
      </Nav>
    </BsNavbar.Collapse>
  </BsNavbar>
);

export default Navbar;