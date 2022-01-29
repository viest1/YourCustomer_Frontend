import React, { useContext } from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const Dots = styled(BsThreeDots)`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 20px;
  transition: transform 0.3s ease;
  * {
    color: ${({ themeType }) => (themeType.layout === 'white' ? 'black' : 'white')};
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

export const DropdownDots = styled.div`
  position: absolute;
  top: 32px;
  right: 16px;
  background: white;
  box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 0.4rem;
  transition: all 0.2s;
  opacity: ${({ open }) => (open ? '1' : '0')};
  transform: ${({ open }) => (open ? 'scale(1)' : 'scale(0)')};
  transform-origin: 100% 0;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;
  }
  li {
    border-radius: 0.2rem;
    padding: 0.6rem 1rem;
    transition: all 0.3s ease-in-out;
    color: black;
    position:relative;
  }
  li:hover {
    background: black;
    color: white;
    cursor: pointer;
  }
  > ul > li::before {
    content: '';
    display: block;
    width: 2px;
    height: 25px;
    background: ${({ theme }) => theme.color.main300};
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 2rem;
    pointer-events: none;
  }
`;

const DotsDropdown = ({ children, handleDropdown, isDropdownOpen }) => {
  const { themeType } = useContext(ListCustomersTestContext);
  return (
    <>
      <Dots onClick={handleDropdown} themeType={themeType} />
      <DropdownDots open={isDropdownOpen}>
        <ul>{children}</ul>
      </DropdownDots>
    </>
  );
};

export default DotsDropdown;
