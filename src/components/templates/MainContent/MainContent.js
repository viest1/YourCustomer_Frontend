import React, { useContext } from 'react';
import styled from 'styled-components';
import CardMainContent from '../../organisms/CardMainContent/CardMainContent';
import creativeWoman from '../../../assets/illustrations/undraw_creative_woman_re_u5tk.svg';
import addInfo from '../../../assets/illustrations/undraw_add_information_j2wg.svg';
import displayStatistics from '../../../assets/illustrations/undraw_grades_re_j7d6.svg';
import displayVisits from '../../../assets/illustrations/undraw_getting_coffee_re_f2do.svg';
import displayCustomers from '../../../assets/illustrations/undraw_apps_re_ienc.svg';
import search from '../../../assets/illustrations/undraw_filter_re_sa16.svg';
import Button from '../../atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerMainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0rem 2rem 2rem 2rem;
  @media only screen and (max-width: 700px) {
    padding: 2rem 0.3rem 2rem 0.3rem;
  }
`;

export const ContainerCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 2rem;
  padding: 3rem;
  max-width: 1360px;
  * {
    transition: 0.5s;
  }
`;

export const ContainerHero = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: calc(100vh - 88px);
  line-height: 1.3;
  position: relative;
  max-width: 1360px;
  @media only screen and (max-width: 700px) {
    padding: 0.5rem;
    padding-bottom: 2rem;
    gap: 1rem;
    height: auto;
    * {
      margin: 0;
    }
  }
  div {
    flex: 0 0 45%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media only screen and (max-width: 700px) {
      flex: 0 0 100%;
      gap: 0.5rem;
    }
  }
  h1 {
    font-weight: bold;
    color: black;
    font-size: clamp(1.1rem, 0.8rem + 3vw, 3.5rem);
    //@media only screen and (max-width:700px){
    //  font-size:1.5rem;
    //}
  }
  h2 {
    font-size: clamp(1rem, 0.7rem + 3vw, 2.5rem);
    margin: 0;
    //@media only screen and (max-width:700px){
    //  font-size:1rem;
    //}
  }

  & > h2 {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    @media only screen and (max-width: 700px) {
      position: static;
      transform: none;
    }
  }
  img {
    width: 100%;
    height: 100%;
    @media only screen and (max-width: 700px) {
      max-width: 300px;
    }
  }
  @media only screen and (max-width: 700px) {
    max-width: 450px;
  }
`;

export const Background = styled.div`
  width: 99.4vw;
  background: ${({ theme }) => theme.color.main100};
  display: flex;
  justify-content: center;
  flex-direction: column;
  & > div > h2 {
    text-align: center;
    width: 100%;
    font-size: clamp(1rem, 0.8rem + 3vw, 2.5rem);
    padding: 2rem;
    margin-bottom: 0;
  }
`;

const MainContent = () => {
  const navigate = useNavigate();
  const { userData } = useContext(ListCustomersTestContext);
  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <ContainerMainContent>
      <ContainerHero>
        <h2>PLWebsites Presents: YourCustomer!</h2>
        <div>
          <h1>YourCustomer - App which helps manage your business!</h1>
          <h2>Easy managing your Customers, Visits and others</h2>
          {!userData.token && <Button text="Click to Log In!" onClick={handleNavigateToLogin} />}
        </div>
        <div>
          <img src={creativeWoman} alt="" />
        </div>
      </ContainerHero>
      <Background>
        <div>
          <h2>Functionalities</h2>
        </div>
        <ContainerCards>
          <CardMainContent text="Add Customer +" path="/add" img={addInfo} />
          <CardMainContent text="Display Customers" path="/customers" img={displayCustomers} />
          <CardMainContent text="Display Visits" path="/visits" img={displayVisits} />
          <CardMainContent text="Display Statistics" path="/statistics" img={displayStatistics} />
          <CardMainContent text="Search" path="/add" img={search} />
          <CardMainContent text="Display Customers" path="/customers" />
        </ContainerCards>
      </Background>
    </ContainerMainContent>
  );
};

export default MainContent;
