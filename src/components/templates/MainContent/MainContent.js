import React, { useContext } from 'react';
import styled from 'styled-components';
import CardMainContent from '../../organisms/CardMainContent/CardMainContent';
import creativeWoman from '../../../assets/illustrations/undraw_creative_woman_re_u5tk.svg';
import addInfo from '../../../assets/illustrations/undraw_add_information_j2wg.svg';
import displayStatistics from '../../../assets/illustrations/undraw_grades_re_j7d6.svg';
import displayVisits from '../../../assets/illustrations/undraw_getting_coffee_re_f2do.svg';
import displayCustomers from '../../../assets/illustrations/undraw_apps_re_ienc.svg';
import settings from '../../../assets/illustrations/undraw_preferences_re_49in.svg';
import search from '../../../assets/illustrations/undraw_filter_re_sa16.svg';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoWhatsapp } from 'react-icons/io';
import Button from '../../atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerMainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem 0 2rem;
  //background:white;
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
    top: 140px;
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
  position: relative;

  & > div > h2 {
    text-align: center;
    width: 100%;
    font-size: clamp(1rem, 0.8rem + 3vw, 2.5rem);
    padding: 2rem;
    margin-bottom: 0;
  }
`;

export const Footer = styled.div`
  background: white;
  position: relative;
  min-height: 500px;
  width: 99.4vw;
  padding: 5rem 2rem 2rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 800px) {
    min-height: 400px;
  }
`;

export const ContainerSocial = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
  z-index: 1;
  align-items: center;
  font-size: 16px;
`;

export const Copyright = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  z-index: 1;
  h2 {
    color: black;
  }
`;

const MainContent = () => {
  const navigate = useNavigate();
  const { userData } = useContext(ListCustomersTestContext);
  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const bottomWave = () => {
    return (
      <div className="custom-shape-divider-bottom-1641212545">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    );
  };
  // const topWave = () => {
  //   return (
  //     <div className="custom-shape-divider-top-1641212792">
  //       <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
  //         <path
  //           d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
  //           className="shape-fill"
  //         ></path>
  //       </svg>
  //     </div>
  //   );
  // };

  const topWave1 = () => {
    return (
      <div className="custom-shape-divider-top-1641214849">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    );
  };
  const bottomWaveVar = bottomWave();
  // const topWaveVar = topWave();
  const topWaveVar1 = topWave1();

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
        {bottomWaveVar}
      </ContainerHero>
      <Background>
        {/*{topWaveVar}*/}
        <div>
          <h2>Functionalities</h2>
        </div>
        <ContainerCards>
          <CardMainContent text="Add Customer +" path="/add" img={addInfo} />
          <CardMainContent text="Display Customers" path="/customers" img={displayCustomers} />
          <CardMainContent text="Display Visits" path="/visits" img={displayVisits} />
          <CardMainContent text="Display Statistics" path="/statistics" img={displayStatistics} />
          <CardMainContent text="Search" path="/add" img={search} />
          <CardMainContent text="Settings" path="/settings" img={settings} />
        </ContainerCards>
        <div>
          <h2>And More...</h2>
        </div>
        {bottomWaveVar}
      </Background>
      <Footer>
        {topWaveVar1}
        {/*{topWaveVar}*/}
        <Copyright>
          <h2>Copyright {new Date().getFullYear()} by PLWebsites</h2>
        </Copyright>
        <h2>YourCustomer - we are developing the application for Your comfort</h2>
        <ContainerSocial>
          <h3>Find us Here</h3>
          <h3>----</h3>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            <FcGoogle />
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noreferrer">
            <IoLogoWhatsapp />
          </a>
        </ContainerSocial>
        {bottomWaveVar}
      </Footer>
    </ContainerMainContent>
  );
};

export default MainContent;
