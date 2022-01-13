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

const Statistics = ({ customers, visits, dateStats = 'Overall Time', t }) => {
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
    return shopProducts?.find((item) => item?.label === el).price;
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
    const shopItemsReturn = shopItems();
    if (shopItemsReturn?.length < 1) return 0;
    if (shopItemsReturn) return 0;
    let sum2 = 0;
    Object.entries(shopItemsReturn).map((item) => {
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
    return sumPrice + sumPremium + sumTip + sumExtraPay + sumShop;
  };

  const arrTexts = [
    t('navigation.customers'),
    customers.length,
    t('navigation.visits'),
    visits?.length,
    t('statistics.avgPriceForVisit'),
    `${averageValue(visits, 'price')}€`,
  ];
  const arrTexts2 = [
    t('statistics.avgTimeForVisit'),
    displayTimeInHHMM(visits),
    t('statistics.avgMoneyForVisit'),
    (visits.length ? sumAll() / visits.length : 0).toFixed(2) + '€',
    t('statistics.moneyPerHour'),
    (visits.length ? ((sumAll() / visits.length).toFixed(2) / averageTimeInMinutes(visits)) * 60 : 0).toFixed(2) + '€',
  ];
  const arrTexts3 = [t('formVisit.tip'), `${sumTip}€`, t('formVisit.premium'), `${sumPremium}€`, t('visit.extra'), `${sumExtraPay}€`];
  const arrTexts5 = [
    t('formData.gender'),
    'Male: ' + sumFilter('gender', 'Male') + ' Female: ' + sumFilter('gender', 'Female'),
    t('formData.size'),
    `${t('small')}: ${sumFilterVisits('size', 'Small')}
    ${t('medium')}: ${sumFilterVisits('size', 'Medium')}
    ${t('big')}: ${sumFilterVisits('size', 'Big')}
    ${t('huge')}: ${sumFilterVisits('size', 'Huge')}`,
    t('service'),
    `${t('washing')}: ${sumTypeService('Washing')}
${t('completeService')}: ${sumTypeService('CompleteService')}
${t('handStripping')}: ${sumTypeService('HandStripping')}`,
  ];
  const arrTexts6 = [
    t('statistics.shopItems'),
    showItems &&
      Object.entries(shopItems()).map((item, index) => (
        <p key={index}>
          {item[0]}: {item[1]}*{findPrice(item[0])} = {findPrice(item[0]) * item[1]}
        </p>
      )),
    t('statistics.shopSold'),
    totalItemsShop(),
    'Empty',
    0,
  ];
  const arrTexts7 = [
    t('formVisit.behavior'),
    `${t('1')}: ${sumFilterVisits('behavior', '1')}
${t('2')}: ${sumFilterVisits('behavior', '2')}
${t('3')}: ${sumFilterVisits('behavior', '3')}
${t('4')}: ${sumFilterVisits('behavior', '4')}
${t('5')}: ${sumFilterVisits('behavior', '5')}`,
    t('statistics.newCustomers'),
    customers.filter((item) => item.visits.length === 1).length,
    t('statistics.oldCustomers'),
    customers.filter((item) => item.visits.length > 1).length,
  ];
  const arrValues = [visits, dateStats, t('button.showItems'), '100%', handleShowItems];
  return (
    <ContainerStatisticsCardsOverall>
      <UniversalCardImgPlusDetails
        arrValues={arrValues}
        noImage={true}
        noButton={true}
        noPhone={true}
        noImageText={
          <div>
            <h2>{t('statistics.totalMoney')}</h2>
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
            <h2>{t('statistics.totalMoneyFromVisits')}</h2>
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
            <h2>{t('statistics.totalMoneyShop')}</h2>
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
