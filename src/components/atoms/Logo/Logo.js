import React from 'react';
import styled from 'styled-components';
import logoYC from '../../../assets/images/logoYCPurple.png';

export const LogoStyle = styled.h2`
  position: absolute;
  top: 25%;
  transform: translateY(-25%);
  left: 22px;
  pointer-events: none;
`;

export const Title = styled.h2``;

const Logo = ({ withText }) => {
  return (
    <>
      {withText ? (
        <Title>
          <img style={{ width: 'clamp(25px, 0.7rem + 2vw, 40px)', height: 'auto' }} src={logoYC} alt={'Logo Your Customer'} />
          <span style={{ marginLeft: 'clamp(-17px, (0.2rem + 0.1vw) * -1, -10px)' }}>
            our
            <span style={{ color: '#6201ed', fontSize: 'clamp(30px, 0.7rem + 2vw, 50px)', fontWeight: 'bold' }}>C</span>
            <span>ustomer</span>
          </span>
        </Title>
      ) : (
        <LogoStyle>
          <img style={{ width: '30px', height: 'auto' }} src={logoYC} alt={'Logo Your Customer'} />
          <span style={{ marginLeft: '-14px' }}>
            <span style={{ color: '#6201ed', fontSize: '30px', fontWeight: 'bold' }}>C</span>
          </span>
        </LogoStyle>
      )}
    </>
  );
};

export default Logo;
