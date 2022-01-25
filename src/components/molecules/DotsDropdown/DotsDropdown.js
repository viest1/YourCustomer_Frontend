import React from 'react';
import styled from 'styled-components';
import { BsThreeDots } from 'react-icons/bs';

export const Dots = styled(BsThreeDots)`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 20px;
  transition: transform 0.3s ease;
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
    padding: 0.4rem 0;
    text-align: left;
  }
  li {
    border-radius: 0.2rem;
    padding: 0.3rem 1rem;
    transition: all 0.3s ease-in-out;
  }
  li:hover {
    background: black;
    color: white;
    cursor: pointer;
  }
`;

const DotsDropdown = ({ children, handleDropdown, isDropdownOpen }) => {
  return (
    <>
      <Dots onClick={handleDropdown} />
      <DropdownDots open={isDropdownOpen}>
        <ul>{children}</ul>
      </DropdownDots>
    </>
  );
};

export default DotsDropdown;
