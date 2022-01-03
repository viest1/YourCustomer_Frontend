import React, { useState } from 'react';
import styled from 'styled-components';
import { shopProducts } from '../../../data/shop';
import { averageTimeInMinutes, averageValue, displayTimeInHHMM, sum, sumValue } from '../../../helpers/statistics';
import UniversalCardImgPlusDetails from '../UniversalCardImgPlusDetails/UniversalCardImgPlusDetails';
import Container3ElemInCol from '../../molecules/Container3ElemInCol/Container3ElemInCol';

export const ContainerCardMonth = styled.div`
  padding: 2rem;
  margin: 0 auto;
`;

export const ContainerListItemsShop = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ContainerOnMobile = styled.div`
  display: flex;
`;
export const ContainerStatisticsCardsOverall = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  gap: 1rem;
  border-radius: 1rem;
`;

const Statistics = ({ customers, visits, dateStats = 'Overall Time' }) => {
  const [showItems, setShowItems] = useState(false);

  const shopItems = () => {
    let arr = [];
    let obj = {};
    for (let i = 0; i < visits.map((item) => item).length; i++) {
      for (let j = 0; j < visits.map((item) => item.shop)[i].map((item) => item.label).length; j++) {
        arr.push(visits.map((item) => item.shop)[i].map((item) => item.label)[j]);
      }
    }
    for (let k = 0; k < arr.length; k++) {
      if (obj.hasOwnProperty(arr[k])) {
        obj[arr[k]] += 1;
      } else {
        obj[arr[k]] = 1;
      }
    }
    return obj;
  };

  const totalItemsShop = () => {
    return Object.values(shopItems()).reduce((a, b) => a + +b, 0);
  };

  const handleShowItems = () => {
    setShowItems((prev) => !prev);
  };

  const findPrice = (el) => {
    return shopProducts.find((item) => item.label === el).price;
  };

  const sumFilter = (el1, el2) => {
    return customers.filter((item) => item[el1]?.label === el2).length;
  };
  const sumFilterVisits = (el1, el2) => {
    if (el1 === 'size') {
      return visits.filter((item) => item[el1] === el2).length;
    }
    return visits.filter((item) => item[el1]?.label === el2).length;
  };
  const sumTypeService = (el1) => {
    return visits.filter((item) => item.price?.value?.split(' ')[1] === el1).length;
  };
  const sumMoneyShop = () => {
    let sum2 = 0;
    Object.entries(shopItems()).map((item) => {
      const sum = findPrice(item[0]) * item[1];
      return (sum2 += +sum);
    });
    return sum2;
  };
  const sumPrice = sumValue(visits, 'price');
  const sumPremium = sumValue(visits, 'premium');
  const sumTip = sum(visits, 'tip');
  const sumExtraPay = sumValue(visits, 'extraPay');
  const sumShop = sumMoneyShop();
  const sumAll = () => {
    console.log(sumPrice, sumPremium, sumTip, sumExtraPay, sumShop);
    return sumPrice + sumPremium + sumTip + sumExtraPay + sumShop;
  };

  const arrTexts = ['Customers:', customers.length, 'Visits:', visits?.length, 'Average Price for Visit:', `${averageValue(visits, 'price')}€`];
  const arrTexts2 = [
    'Average Time for Visit:',
    displayTimeInHHMM(visits),
    'Average Money for Visit + Others',
    (visits.length ? sumAll() / visits.length : 0).toFixed(2) + '€',
    'Money per Working Hour',
    (visits.length ? ((sumAll() / visits.length).toFixed(2) / averageTimeInMinutes(visits)) * 60 : 0).toFixed(2) + '€',
  ];
  const arrTexts3 = ['Tip:', `${sumTip}€`, 'Premium:', `${sumPremium}€`, 'Extra:', `${sumExtraPay}€`];
  const arrTexts5 = [
    'Gender: ',
    'Male: ' + sumFilter('gender', 'Male') + ' Female: ' + sumFilter('gender', 'Female'),
    'Size:',
    `Small: ${sumFilterVisits('size', 'Small')}
    Medium: ${sumFilterVisits('size', 'Medium')}
    Big: ${sumFilterVisits('size', 'Big')}
    Huge: ${sumFilterVisits('size', 'Huge')}`,
    'Service: ',
    `Washing: ${sumTypeService('Washing')}
Complete Service: ${sumTypeService('CompleteService')}
Hand Stripping: ${sumTypeService('HandStripping')}`,
  ];
  const arrTexts6 = [
    'Shop items',
    showItems &&
      Object.entries(shopItems()).map((item, index) => (
        <p key={index}>
          {item[0]}: {item[1]}*{findPrice(item[0])} = {findPrice(item[0]) * item[1]}
        </p>
      )),
    'Shop Sold Total Items',
    totalItemsShop(),
    'Empty',
    0,
  ];
  const arrTexts7 = [
    'Behavior: ',
    `veryAggresive: ${sumFilterVisits('behavior', '1')}
notGood: ${sumFilterVisits('behavior', '2')}
ok: ${sumFilterVisits('behavior', '3')}
kind: ${sumFilterVisits('behavior', '4')}
veryKind: ${sumFilterVisits('behavior', '5')}`,
    'New Customers:',
    customers.filter((item) => item.visits.length === 1).length,
    'Old Customers:',
    customers.filter((item) => item.visits.length > 1).length,
  ];
  const arrValues = [visits, dateStats, 'Show Items', '100%', handleShowItems];
  return (
    <ContainerStatisticsCardsOverall>
      <UniversalCardImgPlusDetails
        arrValues={arrValues}
        noImage={true}
        noButton={true}
        noPhone={true}
        noImageText={
          <div>
            <h2>Total Money:</h2>
            <h2>{sumAll() + '€'}</h2>
          </div>
        }
        width="100%"
        maxWidth="1360px"
        minWidth="650px"
        flexProp="0 0 30%"
      >
        <Container3ElemInCol arrTexts={arrTexts} flexProp="0 0 23.3%" />
        <Container3ElemInCol arrTexts={arrTexts2} flexProp="0 0 23.3%" />
        <Container3ElemInCol arrTexts={arrTexts3} flexProp="0 0 23.3%" />
      </UniversalCardImgPlusDetails>
      <UniversalCardImgPlusDetails
        arrValues={arrValues}
        noPhone={true}
        noButton={true}
        noImage={true}
        noImageText={
          <div>
            <h2>Total Money From Visits:</h2>
            <h2>{sumPrice + '€'}</h2>
          </div>
        }
        width="100%"
        maxWidth="1360px"
        minWidth="650px"
        flexProp="0 0 30%"
        height="auto"
      >
        <Container3ElemInCol arrTexts={arrTexts5} />
        <Container3ElemInCol arrTexts={arrTexts7} />
      </UniversalCardImgPlusDetails>
      <UniversalCardImgPlusDetails
        arrValues={arrValues}
        noPhone={true}
        noImage={true}
        noImageText={
          <div>
            <h2>Total Money Shop:</h2>
            <h2>{sumShop + '€'}</h2>
          </div>
        }
        width="100%"
        maxWidth="1360px"
        minWidth="650px"
        flexProp="0 0 30%"
        height="auto"
      >
        <Container3ElemInCol arrTexts={arrTexts6} flexProp="0 0 70%" />
      </UniversalCardImgPlusDetails>
    </ContainerStatisticsCardsOverall>
  );
};

export default Statistics;
