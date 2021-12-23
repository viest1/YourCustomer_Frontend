import React from 'react';
import styled from 'styled-components';

export const Container2 = styled.div`
  background: white;
  flex: ${({ flexProp }) => (flexProp ? flexProp : `0 0 35%`)};
  border-radius: 1rem;
  //gap: 0.1rem;
  display: flex;
  flex-direction: column;
  //border-right: 1px solid ${({ theme }) => theme.color.main300};
  div {
    background: ${({ theme }) => theme.color.main200};
    flex: 0 0 33.3%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    word-break: break-all;
    //border-right:1px solid black;
    border-top: 1px solid black;
    //border-left: 1px solid black;
    * {
      color: #393939;
    }

    p {
      margin: 0;
    }
  }

  div:hover {
    background: ${({ theme }) => theme.color.main200};
  }

  div:first-child {
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    border-top: none;
  }

  div:last-child {
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    overflow: auto;
    //border-bottom:1px solid black;
  }
`;
export const DivStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0;
  padding: 0;
  justify-content: center;
`;

const Container3ElemInCol = ({ arrTexts, flexProp }) => {
  return (
    <Container2 flexProp={flexProp}>
      <div>
        <p>{arrTexts[0]}</p>
        <DivStyled>{arrTexts[1]}</DivStyled>
      </div>
      <div>
        <p>{arrTexts[2]}</p>
        <p>{arrTexts[3]}</p>
      </div>
      <div>
        <p>{arrTexts[4]}</p>
        <p>{arrTexts[5]}</p>
      </div>
    </Container2>
  );
};

export default Container3ElemInCol;
