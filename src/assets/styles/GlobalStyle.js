import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.color.grey};
    scroll-behavior: smooth;
    background:#fafafa;
    background: ${({ theme }) => theme.color.white100};
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    color: ${({ theme }) => theme.color.black};
  }

  #root {
    min-height: 100vh;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }

  input, button, textarea {
    font-family: 'Roboto', sans-serif;
  }
  .price{
    border:2px dotted red;
    border-radius:0.3rem;
  }

  //::-webkit-scrollbar {
  //  width: 10px;
  //  height: 10px;
  //}
  //
  //::-webkit-scrollbar-track {
  //  border-radius: 10px;
  //  background-color: rgba(255, 255, 255, 0.1);
  //}
  //
  //::-webkit-scrollbar-thumb {
  //  background-image: linear-gradient(45deg, #00aeff, #a68eff);
  //  border-radius: 10px;
  //  -webkit-box-shadow: rgba(0,0,0,.12) 0 3px 13px 1px;
  //}

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
    color: white;
    background-color: ${({ theme }) => theme.color.main100};
    box-shadow: ${({ theme }) => theme.boxShadow.inside};
  }
  .navLink-active-bg2{
    background-color: ${({ theme }) => theme.color.main200};
  }
  .navLink-active-bg3{
    background-color: ${({ theme }) => theme.color.main300};
  }
  .navLink-active-bg4{
    background-color: ${({ theme }) => theme.color.main400};
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

  .custom-shape-divider-bottom-1641212545 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
    z-index:-1;
  }

  .custom-shape-divider-bottom-1641212545 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    max-height:217px;
    min-height:80px;
    height: 15vw;
  }

  .custom-shape-divider-bottom-1641212545 .shape-fill {
    fill: #6C63FF;
  }

  .custom-shape-divider-top-1641212792 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .custom-shape-divider-top-1641212792 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 15vw;
    max-height:217px;
    min-height:80px;
    transform: rotateY(180deg);
  }

  .custom-shape-divider-top-1641212792 .shape-fill {
    fill: #6C63FF;
  }

  .custom-shape-divider-top-1641214849 {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .custom-shape-divider-top-1641214849 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 15vw;
    max-height:217px;
    min-height:80px;
    transform: rotateY(180deg);
  }

  .custom-shape-divider-top-1641214849 .shape-fill {
    fill: #6C63FF;
  }

  .custom-shape-divider-bottom-1641220290 {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
    z-index:-1;
  }

  .custom-shape-divider-bottom-1641220290 svg {
    position: relative;
    display: block;
    width: calc(163% + 1.3px);
    height: 60vw;
  }

  .custom-shape-divider-bottom-1641220290 .shape-fill {
    fill: #6C63FF;
  }
  
  @media all and (max-width:800px){
    .custom-shape-divider-bottom-1641212545{
      bottom: 200px;
    }
  }
  @media all and (max-width:1170px){
    .custom-shape-divider-bottom-1641212545{
      bottom: -26px;
    }
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
