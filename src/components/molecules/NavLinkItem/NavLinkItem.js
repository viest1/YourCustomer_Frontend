import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

const NavLinkItem = ({ path, text, classActive = 'navLink-active', onClick }) => {
  const { themeType } = useContext(ListCustomersTestContext);
  if(themeType.nav === '#29c0b1') classActive = 'navLink-active navLink-active-bg4'
  if(themeType.nav === '#222437') classActive = 'navLink-active navLink-active-bg3'
  if(themeType.nav === '#2c50ed') classActive = 'navLink-active navLink-active-bg2'
  return (
    <div>
      <NavLink to={path} className={({ isActive }) => (isActive ? classActive : null)} onClick={onClick}>
        {text}
      </NavLink>
    </div>
  );
};

export default NavLinkItem;
