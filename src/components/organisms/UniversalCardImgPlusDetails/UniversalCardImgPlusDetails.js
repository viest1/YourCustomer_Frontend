import React from 'react';
import styled from 'styled-components';
import RoundedImageWithArrows from '../../molecules/RoundedImageWithArrows/RoundedImageWithArrows';
import Button from '../../atoms/Button/Button';
// import { averageTimeInMinutes, averageValue, displayTimeInHHMM } from '../../../helpers/statistics';
// import { ContainerStatisticsCardsOverall } from '../CardOverall/CardOverall.styles';
// import Container3ElemInCol from '../../molecules/Container3ElemInCol/Container3ElemInCol';

// <ContainerStatisticsCardsOverall>
//   <UniversalCardImgPlusDetails
//     arrValues={arrValues}
//     noImage={true}
//     noButton={true}
//     noPhone={true}
//     noImageText={
//       <div>
//         <h2>{t('statistics.totalMoney')}</h2>
//         <h2>{sumAll() + '€'}</h2>
//       </div>
//     }
//     width="100%"
//     maxWidth="1360px"
//     minWidth="650px"
//     flexProp="0 0 30%"
//   >
//     <Container3ElemInCol arrTexts={arrTexts} flexProp="0 0 23.3%" />
//     <Container3ElemInCol arrTexts={arrTexts2} flexProp="0 0 23.3%" />
//     <Container3ElemInCol arrTexts={arrTexts3} flexProp="0 0 23.3%" />
//   </UniversalCardImgPlusDetails>
//   <UniversalCardImgPlusDetails
//     arrValues={arrValues}
//     noPhone={true}
//     noButton={true}
//     noImage={true}
//     noImageText={
//       <div>
//         <h2>{t('statistics.totalMoneyFromVisits')}</h2>
//         <h2>{sumPrice + '€'}</h2>
//       </div>
//     }
//     width="100%"
//     maxWidth="1360px"
//     minWidth="650px"
//     flexProp="0 0 30%"
//     height="auto"
//   >
//     <Container3ElemInCol arrTexts={arrTexts5} />
//     <Container3ElemInCol arrTexts={arrTexts7} />
//   </UniversalCardImgPlusDetails>
//   <UniversalCardImgPlusDetails
//     arrValues={arrValues}
//     noPhone={true}
//     noImage={true}
//     noImageText={
//       <div>
//         <h2>{t('statistics.totalMoneyShop')}</h2>
//         <h2>{sumShop + '€'}</h2>
//       </div>
//     }
//     width="100%"
//     maxWidth="1360px"
//     minWidth="650px"
//     flexProp="0 0 30%"
//     height="auto"
//   >
//     <Container3ElemInCol arrTexts={arrTexts6} flexProp="0 0 70%" />
//   </UniversalCardImgPlusDetails>
// </ContainerStatisticsCardsOverall>

// const arrTexts = [
//   t('navigation.customers'),
//   customers.length,
//   t('navigation.visits'),
//   visits?.length,
//   t('statistics.avgPriceForVisit'),
//   `${averageValue(visits, 'price')}€`,
// ];
// const arrTexts2 = [
//   t('statistics.avgTimeForVisit'),
//   displayTimeInHHMM(visits),
//   t('statistics.avgMoneyForVisit'),
//   (visits.length ? sumAll() / visits.length : 0).toFixed(2) + '€',
//   t('statistics.moneyPerHour'),
//   (visits.length ? ((sumAll() / visits.length).toFixed(2) / averageTimeInMinutes(visits)) * 60 : 0).toFixed(2) + '€',
// ];
// const arrTexts3 = [t('formVisit.tip'), `${sumTip}€`, t('formVisit.premium'), `${sumPremium}€`, t('visit.extra'), `${sumExtraPay}€`];
// const arrTexts5 = [
//   t('formData.gender'),
//   'Male: ' + sumFilter('gender', 'Male') + ' Female: ' + sumFilter('gender', 'Female'),
//   t('formData.size'),
//   `${t('small')}: ${sumFilterVisits('size', 'Small')}
//     ${t('medium')}: ${sumFilterVisits('size', 'Medium')}
//     ${t('big')}: ${sumFilterVisits('size', 'Big')}
//     ${t('huge')}: ${sumFilterVisits('size', 'Huge')}`,
//   t('service'),
//   `${t('washing')}: ${sumTypeService('Washing')}
// ${t('completeService')}: ${sumTypeService('CompleteService')}
// ${t('handStripping')}: ${sumTypeService('HandStripping')}`,
// ];
// const arrTexts6 = [
//   t('statistics.shopItems'),
//   showItems &&
//   Object.entries(shopItems()).map((item, index) => (
//     <p key={index}>
//       {item[0]}: {item[1]}*{findPrice(item[0])} = {findPrice(item[0]) * item[1]}
//     </p>
//   )),
//   t('statistics.shopSold'),
//   totalItemsShop(),
//   'Empty',
//   0,
// ];
// const arrTexts7 = [
//   t('formVisit.behavior'),
//   `${t('1')}: ${sumFilterVisits('behavior', '1')}
// ${t('2')}: ${sumFilterVisits('behavior', '2')}
// ${t('3')}: ${sumFilterVisits('behavior', '3')}
// ${t('4')}: ${sumFilterVisits('behavior', '4')}
// ${t('5')}: ${sumFilterVisits('behavior', '5')}`,
//   t('statistics.newCustomers'),
//   customers.filter((item) => item.visits.length === 1).length,
//   t('statistics.oldCustomers'),
//   customers.filter((item) => item.visits.length > 1).length,
// ];
// const arrValues = [visits, dateStats, t('button.showItems'), '100%', handleShowItems];

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
  overflow-x: auto;
  position: relative;
  margin: 0 auto;
  box-shadow: 10px 10px 15px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  @media all and (max-width: 1277px) {
    width: ${({ width }) => (width ? width : '45%')};
  }
  @media all and (max-width: 890px) {
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
