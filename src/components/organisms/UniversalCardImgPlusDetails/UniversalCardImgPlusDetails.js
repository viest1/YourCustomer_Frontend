import React from 'react';
import styled from 'styled-components';
import RoundedImageWithArrows from '../../molecules/RoundedImageWithArrows/RoundedImageWithArrows';
import Button from '../../atoms/Button/Button';

export const ContainerCardCustomer = styled.div`
  padding: 0.5rem;
  background: ${({ theme }) => theme.color.main100};
  width: ${({ width }) => (width ? width : '30%')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '500px')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '370px')};
  height: ${({ height }) => (height ? height : '320px')};
  display: flex;
  text-align: center;
  border-radius: 1rem;
  //flex-wrap:wrap;
  position: relative;
  margin: 0 auto;
  box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  @media all and (max-width:1277px){
    width: ${({ width }) => (width ? width : '45%')};
  }
  @media all and (max-width:890px){
    width: ${({ width }) => (width ? width : '100%')};
  }
`;

export const Container1 = styled.div`
  background: ${({ theme }) => theme.color.white};
  flex: ${({ flexProp }) => (flexProp ? flexProp : `0 0 65%`)};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: ${({ container1Padding }) => (container1Padding ? container1Padding : `1rem`)};
  border-radius: 1rem;
`;

export const StyledAnchorTel = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const UniversalCardImgPlusDetails = ({
  button2,
  noButton,
  noPhone,
  noImage,
  noImageText,
  container1Padding,
  photo,
  arrValues,
  children,
  flexProp,
  width,
  maxWidth,
  minWidth,
  height,
}) => {
  return (
    <ContainerCardCustomer width={width} maxWidth={maxWidth} minWidth={minWidth} height={height}>
      <Container1 flexProp={flexProp} container1Padding={container1Padding}>
        {noImage ? <div>{noImageText}</div> : <RoundedImageWithArrows item={arrValues[0]} photo={photo} />}
        <div>
          {noPhone ? (
            <h2>{arrValues[1]}</h2>
          ) : (
            <h2>
              <StyledAnchorTel href={`tel:${arrValues[1]}`}>{arrValues[1]}</StyledAnchorTel>
            </h2>
          )}
        </div>
        {!noButton && (
          <div style={{ width: '100%' }}>
            <Button text={arrValues[2]} width={arrValues[3]} onClick={arrValues[4]} />
          </div>
        )}
        {button2?.length && (
          <div style={{ width: '100%' }}>
            <Button text={button2[0]} width={button2[1]} onClick={button2[2]} />
          </div>
        )}
      </Container1>
      {children}
    </ContainerCardCustomer>
  );
};

export default UniversalCardImgPlusDetails;
