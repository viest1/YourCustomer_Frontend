import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.color.grey}
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    color: ${({ theme }) => theme.color.grey};
  }

  #root {
    min-height: 100vh;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }

  input, button, textarea {
    font-family: 'Roboto', sans-serif;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-button {
    width: 75px; //for horizontal scrollbar
    height: 75px; //for vertical scrollbar
  }

  ::-webkit-scrollbar-track {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 100px;
    border: 6px solid #6aa7b350;
    border-left: 0;
    border-right: 0;
    background-color: ${({ theme }) => theme.color.main200}
  }

  img {
    width: 15px;
    height: 15px;
  }

  #root.dark-mode {
    color: #999;
  }

  #root.light-mode {
    transition: background-color 0.4s ease;
  }

  .navLink-active {
    color: ${({ theme }) => theme.color.main300};
    background-color: ${({ theme }) => theme.color.main100};
    box-shadow: ${({ theme }) => theme.boxShadow.inside};
  }

  .search-input-enter, .navLink-transition-enter {
    opacity: 0;
    transition: all 300ms;
    transform: translateX(100px);
  }

  .search-input-enter-active, .navLink-transition-enter-active {
    opacity: 1;
    transition: all 300ms;
    transform: translateX(-10px);
  }

  .search-input-exit, .navLink-transition-exit {
    opacity: 1;
    transition: all 300ms;
    transform: translateX(-10px);
  }

  .search-input-exit-active, .navLink-transition-exit-active {
    opacity: 0;
    transition: all 300ms;
    transform: translateX(-300px);
  }

  .nav-icon-1 {
    width: 30px;
    height: 30px;
    position: relative;
    transition: .1s;
    //margin: 10px 10px;
    cursor: pointer;
    display: inline-block;
  }

  .nav-icon-1 span {
    width: 5px;
    height: 5px;
    background-color: ${({ theme }) => theme.color.black};
    display: block;
    border-radius: 50%;
    position: absolute;

  }

  .nav-icon-1:hover span {
    transform: scale(1.2);
    transition: 350ms cubic-bezier(.8, .5, .2, 1.4);
  }

  .nav-icon-1 span:nth-child(1) {
    left: 0;
    top: 0;
  }

  .nav-icon-1 span:nth-child(2) {
    left: 12px;
    top: 0;
  }

  .nav-icon-1 span:nth-child(3) {
    right: 0;
    top: 0;
  }

  .nav-icon-1 span:nth-child(4) {
    left: 0;
    top: 12px;
  }

  .nav-icon-1 span:nth-child(5) {
    position: absolute;
    left: 12px;
    top: 12px;
  }

  .nav-icon-1 span:nth-child(6) {
    right: 0px;
    top: 12px;
  }

  .nav-icon-1 span:nth-child(7) {
    left: 0px;
    bottom: 0px;
  }

  .nav-icon-1 span:nth-child(8) {
    position: absolute;
    left: 12px;
    bottom: 0px;
  }

  .nav-icon-1 span:nth-child(9) {
    right: 0px;
    bottom: 0px;
  }

  .nav-icon-1.open {
    transform: rotate(180deg);
    cursor: pointer;
    transition: .2s cubic-bezier(.8, .5, .2, 1.4);
  }

  .nav-icon-1.open span {
    border-radius: 50%;
    transition-delay: 200ms;
    transition: .5s cubic-bezier(.8, .5, .2, 1.4);
  }

  .nav-icon-1.open span:nth-child(2) {
    left: 6px;
    top: 6px;
  }

  .nav-icon-1.open span:nth-child(4) {
    left: 6px;
    top: 18px;
  }

  .nav-icon-1.open span:nth-child(6) {
    right: 6px;
    top: 6px;
  }

  .nav-icon-1.open span:nth-child(8) {
    left: 18px;
    bottom: 6px;
  }
  ;

  //.icon {
  //  margin: 20px;
  //}
`;

export const ContainerLoadingSpinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  width: 100vw;
  min-height: 120vh;
`;
