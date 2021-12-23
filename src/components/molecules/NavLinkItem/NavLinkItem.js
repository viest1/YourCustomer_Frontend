import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinkItem = ({ path, text, classActive = 'navLink-active', onClick }) => {
  return (
    <div>
      <NavLink to={path} className={({ isActive }) => (isActive ? classActive : undefined)} onClick={onClick}>
        {text}
      </NavLink>
    </div>
  );
};

export default NavLinkItem;
