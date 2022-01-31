import React, { useContext } from 'react';
import './Button.css';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import styled from 'styled-components';

export const ButtonStyles = styled.button`
   {
    //width: 220px;
    /* default: 220px */
    //height: 40px;
    padding: 0.7rem 2rem;
    border: none;
    outline: none;
    color: #fff;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:before {
    content: '';
    /*background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);*/
    background: linear-gradient(45deg, #6201ed, #29c0b1, #222437, #2c50ed, white);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(2px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 60s linear infinite;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }

  &:active {
    color: white;
  }

  &:active:after,
  &:hover:after {
    background: transparent;
  }

  &:before {
    opacity: 1;
  }

  //.glow-on-hover:hover:before {
  //    opacity: 1;
  //}

  &:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ themeType, loginBtn, theme }) => (loginBtn ? theme.color.main100 : themeType.button)};
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

const Button = ({ text, type = 'button', onClick, width, height, loginBtn, icon }) => {
  const { themeType } = useContext(ListCustomersTestContext);
  return (
    <div>
      <ButtonStyles loginBtn={loginBtn} type={type} onClick={onClick} themeType={themeType} style={{ width: width, height: height }}>
        {icon && <span>{icon}</span>}
        {text}
      </ButtonStyles>
    </div>
  );
};

export default Button;
