import React from 'react';
import PropTypes from 'prop-types'

import {
    Navbar as BsNavbar,
    Nav,
    NavItem
} from 'react-bootstrap';

const MenuNavItem = ({
  nav,
  navIndex,
  disabled
}) => {
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
  <BsNavbar fixedTop={true}>
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


Navbar.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
  }))
};

export default Navbar;