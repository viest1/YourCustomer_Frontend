import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerCardMainContent = styled(NavLink)`
  width: 30%;
  min-width: 300px;
  max-width: 300px;
  height: 300px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.color.main200};
  //border: 1px solid black;
  outline: none;
  cursor: ${({ prevent }) => (prevent === 'false' ? 'auto' : 'pointer')};
  border-radius: 1rem;
  text-decoration: none;
  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 100%;
    height: 80%;
    border-radius: 1rem;
    padding: 0.2rem;
    background: ${({ theme }) => theme.color.main300};
  }
  &:hover {
    background: ${({ theme }) => theme.color.main200};
    transform: scale(1.1);
  }
`;

const CardMainContent = ({ text, path, img, altText }) => {
  const handleNavigate = (e) => {
    if(userData.token){
      return;
    } else {
      e.preventDefault()
    }
  }
  const { userData } = useContext(ListCustomersTestContext)
  return (
    <ContainerCardMainContent to={path} prevent={!!userData.token ? 'true' : 'false'} onClick={handleNavigate}>
      <h2>{text}</h2>
      <img src={img} alt={altText} />
    </ContainerCardMainContent>
  );
};

export default CardMainContent;
