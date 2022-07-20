import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerCardMainContent = styled(NavLink)`
  height: 400px;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: 400px;
  justify-items: end;
  padding: 1rem 1.5rem;
  gap: 2rem;
  max-width: 1200px;
  /* background: ${({ theme }) => theme.color.main200}; */
  background: ${({ theme }) => theme.color.main100};
  //border: 1px solid black;
  outline: none;
  cursor: ${({ prevent }) => (prevent === 'false' ? 'auto' : 'pointer')};
  border-radius: 1rem;
  text-decoration: none;
  box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.15);
  @media all and (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 200px;
    justify-items: start;
    padding: 0 1.5rem;
  }
  /* div {
    box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.15);
  } */

  h2 {
    /* display: flex;
    justify-content: center;
    align-items: center; */
    font-size: 40px;
  }

  img {
    width: auto;
    height: 80%;
    border-radius: 1rem;
    padding: 0.2rem;
    display: block;
    /* max-width: 400px; */
    /* box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.15); */
    /* background: ${({ theme }) => theme.color.main300}; */
  }

  &:hover {
    /* background: ${({ theme }) => theme.color.main200}; */
    /* transform: scale(1.05); */
  }
`;

const CardMainContent = ({ text, path, img, altText, desc }) => {
  const handleNavigate = (e) => {
    if (userData.token) {
    } else {
      e.preventDefault();
    }
  };
  const { userData } = useContext(ListCustomersTestContext);
  return (
    <ContainerCardMainContent to={path} prevent={!!userData.token ? 'true' : 'false'} onClick={handleNavigate}>
      <div>
        <h2>{text}</h2>
        <p>
          Thanks to Zencal you can now easily create multiple teams and have everyone's calendars synced for the specific meeting topic. This way you
          can run many-to-many scheduling with ease.
        </p>
      </div>
      <img src={img} alt={altText} />
    </ContainerCardMainContent>
  );
};

export default CardMainContent;
