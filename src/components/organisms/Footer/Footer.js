import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoWhatsapp } from 'react-icons/io';
import { ContainerSocial, Copyright, FooterContainer, topWaveVar1 } from '../../templates/MainContent/MainContent';

const Footer = ({ t }) => {
  return (
    <FooterContainer>
      {/* {topWaveVar1} */}
      {/*{topWaveVar}*/}
      <Copyright>
        <p>Copyright {new Date().getFullYear()} by PLWebsites</p>
      </Copyright>
      <h2>{t('footer.mainText')}</h2>
      <ContainerSocial>
        <h3>{t('footer.textIcons')}</h3>
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
      <div className="custom-shape-divider-bottom-1641212545" style={{ zIndex: '0' }}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </FooterContainer>
  );
};

export default Footer;
