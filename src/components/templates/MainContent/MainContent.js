import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import CardMainContent from '../../organisms/CardMainContent/CardMainContent';
import creativeWoman from '../../../assets/illustrations/undraw_creative_woman_re_u5tk.svg';
import gif from '../../../assets/images/video2-gif.gif';
import addInfo from '../../../assets/illustrations/undraw_add_information_j2wg.svg';
import displayStatistics from '../../../assets/illustrations/undraw_grades_re_j7d6.svg';
import displayVisits from '../../../assets/illustrations/undraw_getting_coffee_re_f2do.svg';
import displayCustomers from '../../../assets/illustrations/undraw_apps_re_ienc.svg';
import settings from '../../../assets/illustrations/undraw_preferences_re_49in.svg';
import search from '../../../assets/illustrations/undraw_filter_re_sa16.svg';
import Button from '../../atoms/Button/Button';
import { useNavigate } from 'react-router-dom';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import Footer from '../../organisms/Footer/Footer';
import Logo from '../../atoms/Logo/Logo';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
// import Stats from '../../../assets/images/statisticsPage1.png';
// import CustomersImg from '../../../assets/images/customersPage1.png';
// import VisitsImg from '../../../assets/images/visitsPage1.png';

export const ContainerMainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem 0 2rem;
  overflow: hidden;
  //background:white;
  @media only screen and (max-width: 1000px) {
    padding: 1rem 0.3rem;
  }
`;

export const ContainerCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 2rem;
  padding: 3rem 1rem;
  max-width: 1360px;
  * {
    transition: 0.5s;
  }
  @media all and (max-width: 1070px) {
    max-width: 100%;
    justify-content: flex-start;
    gap: 1rem;
  }
`;

// export const ContainerBackgroundHero = styled.div`
//   background-image: url(${Stats});
//   background-size:contain;
//   background-repeat: no-repeat;
// `

export const ContainerHero = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: calc(100vh - 88px);
  line-height: 1.3;
  max-width: 1360px;

  // &:before{
  //   content: "";
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  //   background-image: url($)
  //   background-size: cover;
  //   filter: grayscale(100%);
  //   z-index:1;
  // }

  //h2 {
  //  color: #222121;
  //}

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
    flex: 0 0 47%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media only screen and (max-width: 700px) {
      flex: 0 0 100%;
      gap: 1rem;
    }
  }
  h3 {
    color: ${({ theme }) => theme.color.black};
  }

  h1 {
    font-weight: bold;
    color: ${({ theme }) => theme.color.black};
    font-size: clamp(1.1rem, 0.8rem + 3vw, 3.5rem);
    //@media only screen and (max-width:700px){
    //  font-size:1.5rem;
    //}
    @media only screen and (max-width: 700px) {
      margin-bottom: 50px;
    }
  }

  h2,
  h3 {
    font-size: clamp(1rem, 0.7rem + 2vw, 2rem);
    margin: 0;
    color: ${({ theme }) => theme.color.black};
    font-weight: normal;
    //@media only screen and (max-width:700px){
    //  font-size:1rem;
    //}
  }

  h3 {
    font-size: clamp(0.9rem, 0.6rem + 2vw, 1.3rem);
    @media only screen and (max-width: 700px) {
      margin-bottom: 30px;
    }
  }

  & > h2 {
    //position: absolute;
    //top: 140px;
    //left: 50%;
    //transform: translateX(-50%);
    //width: 100%;
    text-align: center;
    @media only screen and (max-width: 700px) {
      position: static;
      transform: none;
    }
  }

  img {
    width: 100%;
    height: 100%;
    /* @media only screen and (max-width: 700px) {
      max-width: 300px;
    } */
  }

  @media only screen and (max-width: 700px) {
    max-width: 450px;
  }
  //> div:last-child{
  //  position: relative;
  //  display:block;
  //}
`;

export const Background = styled.div`
  width: 99.4vw;
  /* background: ${({ theme }) => theme.color.main100}; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  * {
    color: white;
  }
  & > div > h2 {
    text-align: center;
    width: 100%;
    font-size: clamp(1rem, 0.8rem + 3vw, 2.5rem);
    padding: 2rem;
    margin-bottom: 0;
    background: ${({ theme }) => theme.color.main100};
  }
`;

export const FooterContainer = styled.div`
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
    color: ${({ theme }) => theme.color.black};
    padding: 0;
    margin: 4px;
  }
`;

export const ImgHero = styled.img`
  position: absolute;
  z-index: 0;
  width: 100px;
  height: 80px;
  top: 0;
`;

// Dashboard Styles

const ContainerDashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  padding: 1rem 2rem;
  height: 500px;
  max-width: 1200px;
  width: 100%;
  @media all and (max-width: 1000px) {
    grid-template-columns: 1fr;
    padding: 0;
  }
`;
const BoxVisits = styled.div`
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  padding: 0 1rem;
  box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
`;
const TitleTable = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr;
  padding: 0 1rem;
  gap: 1rem;
  p {
    color: #919191;
  }
  @media all and (max-width: 1000px) {
    grid-template-columns: 2fr 1.5fr 1fr 1fr;
    padding: 0;
  }
`;
const RowTable = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr;
  padding: 0 1rem;
  gap: 1rem;
  border-top: 1px solid #dbd9d9;
  @media all and (max-width: 1000px) {
    grid-template-columns: 2fr 1.5fr 1fr 1fr;
    padding: 0;
  }
`;
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

const bottomWaveVar = bottomWave();
// const topWaveVar = topWave();
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
export const topWaveVar1 = topWave1();

const MainContent = () => {
  const navigate = useNavigate();
  const { userData, t } = useContext(ListCustomersTestContext);
  const handleNavigateToLogin = () => {
    navigate('/login');
  };
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchVisits = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/visits', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
      },
    });
    const resJSON = await res.json();
    setVisits(resJSON.allVisits);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVisits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDetailsVisit = (id) => {
    navigate(`/visits/${id}`);
  };

  if (!userData.token) {
    return (
      <ContainerMainContent>
        <ContainerHero>
          {/*<h2>{t('heroContent.presents')}</h2><Logo withText />*/}
          <div>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', flexDirection: 'row' }}>
              <Logo />
              <h2>YourCustomer</h2>
            </div>
            <h1 style={{ padding: '0', margin: '0' }}>{t('heroContent.heroTextAlternative')}</h1>
            <h3>{t('heroContent.secondHeroTextAlternative')}</h3>
            {!userData.token && <Button text={t('button.clickToLogIn')} height={'45px'} onClick={handleNavigateToLogin} />}
          </div>
          <div>
            <img src={gif} alt="organised women" />
            {/*  <img src={Stats} alt="organised women" />*/}
            {/*<ImgHero src={CustomersImg} />*/}
            {/*<ImgHero src={VisitsImg} />*/}
          </div>
          {bottomWaveVar}
        </ContainerHero>
        <Background>
          {/*{topWaveVar}*/}
          <div>
            <h2>{t('functionalities.functionalities')}</h2>
          </div>
          <ContainerCards>
            <CardMainContent text={t('functionalities.addCustomer')} path="/add" img={addInfo} />
            <CardMainContent text={t('functionalities.displayCustomers')} path="/customers" img={displayCustomers} />
            <CardMainContent text={t('functionalities.displayVisits')} path="/visits" img={displayVisits} />
            <CardMainContent text={t('functionalities.displayStatistics')} path="/statistics" img={displayStatistics} />
            {/* <CardMainContent text={t('functionalities.search')} path="/" img={search} />
            <CardMainContent text={t('functionalities.settings')} path="/settings" img={settings} /> */}
          </ContainerCards>
          <div>
            <h2>{t('functionalities.andMore')}</h2>
          </div>
          {bottomWaveVar}
        </Background>
        <Footer t={t} />
      </ContainerMainContent>
    );
  }
  // const weekday = new Date(visit).toLocaleString('default', { weekday: 'long' });
  return (
    <ContainerMainContent>
      <ContainerDashboard>
        <BoxVisits>
          <h4>{t('lastVisit')}</h4>
          <TitleTable>
            <p>Name</p>
            <p>Date</p>
            <p>Weekday</p>
            <p>Visits</p>
          </TitleTable>
          {console.log(visits)}
          {visits.length > 0 ? (
            visits
              .sort((a, b) => new Date(b.visit).getTime() + +b.hour.split(':')[0] - (new Date(a.visit).getTime() + +a.hour.split(':')[0]))
              .slice(0, 20)
              .map((item) => (
                <RowTable onClick={() => handleDetailsVisit(item._id)}>
                  <p>{item.customer.contactName}</p>
                  <p>{item.visit}</p>
                  <p>{new Date(item.visit).toLocaleString('default', { weekday: 'short' })}</p>
                  <p>{item.customer.visits.length}</p>
                </RowTable>
              ))
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LoadingSpinner />
            </div>
          )}
        </BoxVisits>
      </ContainerDashboard>
    </ContainerMainContent>
  );
};

export default MainContent;
