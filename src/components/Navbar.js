import React from 'react';

import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem
} from 'react-bootstrap';

const MenuDropdown = ({dropdown, itemIndex}) => {
  const menuItems = dropdown.items.map((item, index) =>
    <MenuItem key={`dropdown-menu-item-${itemIndex}-${index}`} onClick={item.onClick} disabled={item.disabled || false}>
      {item.title}
    </MenuItem>
  )

  return <NavDropdown eventKey={itemIndex} title={dropdown.title} id={`${dropdown.title}-dropdown`}>
      {menuItems}
    </NavDropdown>;
}

const MenuNavItem = ({nav, navIndex, disabled}) => {
  return <NavItem eventKey={navIndex} onClick={nav.onClick} disabled={disabled}>{nav.title}</NavItem>
}

const BuildMenuItems = ({items}) => {
  return items.map((item, index) => {
    if (item.items && Array.isArray(item.items)) {
      return <MenuDropdown dropdown={item} itemIndex={index} key={`menu-item-${item.title}-${index}`} />;
    }

    return <MenuNavItem
      nav={item}
      navIndex={index}
      key={`menu-item-${item.title}-${index}`}
      disabled={item.disabled}
    />;
  })
}

export default ({title = '', items = []}) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        {title}
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <BuildMenuItems items={items} />
    </Nav>
  </Navbar>
)