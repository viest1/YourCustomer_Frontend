import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import { shopProducts } from '../../../data/shop';
import { sumValue, sum, averageValue, displayTimeInHHMM } from '../../../helpers/statistics';
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
  display:flex;
  flex-direction: column;
  gap:1rem;
`


const Statistics = ({ customers, visits }) => {
  const [listItemsShop, setListItemsShop] = useState({});
  const [showItems, setShowItems] = useState(false);
  let sum2 = 0;

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
    return visits.filter((item) => item[el1]?.label === el2).length;
  };
  const sumMoneyShop = () => {
    let sum2 = 0;
    Object.entries(shopItems()).map((item) => {
      const sum = findPrice(item[0]) * item[1];
      sum2 += +sum;
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
    console.log({customers, visits})
    return sumPrice + sumPremium + sumTip + sumExtraPay + sumShop;
  };

  const arrTexts = ['Customers:', customers.length, 'Visits:', visits?.length, 'Average Price for Visit:', averageValue(visits, 'price')];
  const arrTexts2 = [
    'Average Time for Visit:',
    displayTimeInHHMM(visits),
    'New Customers:',
    customers.filter((item) => item.visits.length === 1).length,
    'Old Customers:',
    customers.filter((item) => item.visits.length > 1).length,
  ];
  const arrTexts3 = ['Tip:', sumTip, 'Premium:', sumPremium, 'Extra:', sumExtraPay];
  const arrTexts5 = [
    'Gender: ',
    'Male: ' + sumFilter('gender', 'Male') + ' ' + 'Female: ' + sumFilter('gender', 'Female'),
    'Size:',
    `Small: ${sumFilter('size', 'Small')}
    Medium: ${sumFilter('size', 'Medium')}
    Big: ${sumFilter('size', 'Big')}
    Huge: ${sumFilter('size', 'Huge')}`,
    'Service: ',
    `Washing: ${sumFilterVisits('service', 'Washing')}
Complete Service: ${sumFilterVisits('service', 'Complete Service')}
Hand Stripping: ${sumFilterVisits('service', 'Hand Stripping')}`,
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
    'Empty:',
    0,
    'Empty',
    0,
  ];
  const arrValues = [visits, 'Overall Time', 'Show Items', '100%', handleShowItems];
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
            <h2>{sumAll()}</h2>
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
            <h2>{sumPrice}</h2>
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
            <h2>{sumShop}</h2>
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
