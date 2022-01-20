import React, { useState } from 'react';
import { shopProducts } from '../../../data/shop';
import { averageTimeInMinutes, averageValue, displayTimeInHHMM, sum, sumValue } from '../../../helpers/statistics';
import UniversalCardImgPlusDetails from '../UniversalCardImgPlusDetails/UniversalCardImgPlusDetails';
import Container3ElemInCol from '../../molecules/Container3ElemInCol/Container3ElemInCol';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Grid1, ContainerStatisticsCardsOverall, ContainerCardMonth, ContainerOnMobile, ContainerListItemsShop, Grid2 } from './CardOverall.styles';
import { FaDog } from 'react-icons/fa';

const Statistics = ({ customers, visits, dateStats = 'Overall Time', t }) => {
  const [showItems, setShowItems] = useState(false);
  const handleShowItems = () => {
    setShowItems((prev) => !prev);
  };
  const shopItems = () => {
    let arr = [];
    let obj = {};
    for (let i = 0; i < visits.map((item) => item).length; i++) {
      for (let j = 0; j < visits.map((item) => item.shop)[i].map((item) => item.label).length; j++) {
        arr.push(visits.map((item) => item.shop)[i].map((item) => item.label)[j]);
      }
    }
    arr.filter((item) => item !== undefined);
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
  const findPrice = (el) => {
    return shopProducts?.find((item) => item?.label === el)?.price;
  };
  const sumMoneyShop = () => {
    const shopItemsReturn = shopItems();
    if (shopItemsReturn?.length < 1) return 0;
    if (!shopItemsReturn) return 0;
    let sum2 = 0;
    Object.entries(shopItemsReturn).map((item) => {
      const sum = findPrice(item[0]) * item[1];
      return (sum2 += +sum);
    });
    return sum2;
  };
  const sumShop = sumMoneyShop();

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

  const sumPrice = sumValue(visits, 'price');
  const sumPremium = sumValue(visits, 'premium');
  const sumTip = sum(visits, 'tip');
  const sumExtraPay = sumValue(visits, 'extraPay');

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

  const data = {
    totalMoney: {
      name: 'totalMoney',
      title: t('statistics.totalMoney'),
      value: sumAll() + '€',
    },
    totalMoneyFromVisits: {
      name: 'totalMoneyFromVisits',
      title: t('statistics.totalMoneyFromVisits'),
      value: sumPrice + '€',
    },
    totalMoneyShop: {
      name: 'totalMoneyShop',
      title: t('statistics.totalMoneyShop'),
      value: sumShop + '€',
    },
    customers: {
      name: 'customers',
      title: t('navigation.customers'),
      value: customers.length,
    },
    visits: {
      name: 'visits',
      title: t('navigation.visits'),
      value: visits?.length,
    },
    avgPriceForVisit: {
      name: 'avgPriceForVisit',
      title: t('statistics.avgPriceForVisit'),
      value: `${averageValue(visits, 'price')}`,
    },
    avgTimeForVisit: {
      name: 'avgTimeForVisit',
      title: t('statistics.avgTimeForVisit'),
      value: displayTimeInHHMM(visits),
    },
    avgMoneyForVisit: {
      name: 'avgMoneyForVisit',
      title: t('statistics.avgMoneyForVisit'),
      value: (visits.length ? sumAll() / visits.length : 0).toFixed(2),
    },
    moneyPerHour: {
      name: 'moneyPerHour',
      title: t('statistics.moneyPerHour'),
      value: (visits.length ? ((sumAll() / visits.length).toFixed(2) / averageTimeInMinutes(visits)) * 60 : 0).toFixed(2),
    },
    tip: {
      name: 'tip',
      title: t('formVisit.tip'),
      value: `${sumTip}€`,
    },
    premium: {
      name: 'premium',
      title: t('formVisit.premium'),
      value: `${sumPremium}€`,
    },
    extra: {
      name: 'extra',
      title: t('visit.extra'),
      value: `${sumExtraPay}€`,
    },
    gender: {
      name: 'gender',
      title: t('formData.gender'),
      value: [
        {
          title: 'Male: ',
          value: sumFilter('gender', 'Male'),
        },
        {
          title: 'Female: ',
          value: sumFilter('gender', 'Female'),
        },
      ],
    },
    size: {
      name: 'size',
      title: t('formData.size'),
      value: [
        {
          title: t('small'),
          value: sumFilterVisits('size', 'Small'),
        },
        {
          title: t('medium'),
          value: sumFilterVisits('size', 'Medium'),
        },
        {
          title: t('big'),
          value: sumFilterVisits('size', 'Big'),
        },
        {
          title: t('huge'),
          value: sumFilterVisits('size', 'Huge'),
        },
      ],
    },
    service: {
      name: 'service',
      title: t('service'),
      value: [
        {
          title: t('washing'),
          value: sumTypeService('Washing'),
        },
        {
          title: t('completeService'),
          value: sumTypeService('CompleteService'),
        },
        {
          title: t('handStripping'),
          value: sumTypeService('HandStripping'),
        },
      ],
    },
    shopItems: {
      name: 'shopItems',
      title: t('statistics.shopItems'),
      value:
        showItems &&
        Object.entries(shopItems()).map((item, index) => (
          <p key={index}>
            {item[0]}: {item[1]}*{findPrice(item[0])} = {findPrice(item[0]) * item[1]}
          </p>
        )),
    },
    shopSoldItems: {
      name: 'shopSoldItems',
      title: t('statistics.shopSold'),
      value: totalItemsShop(),
    },
    behavior: {
      name: 'behavior',
      title: t('formVisit.behavior'),
      value: [
        {
          title: t('1'),
          value: sumFilterVisits('behavior', '1'),
        },
        {
          title: t('2'),
          value: sumFilterVisits('behavior', '2'),
        },
        {
          title: t('3'),
          value: sumFilterVisits('behavior', '3'),
        },
        {
          title: t('4'),
          value: sumFilterVisits('behavior', '4'),
        },
        {
          title: t('5'),
          value: sumFilterVisits('behavior', '5'),
        },
      ],
    },
    newCustomers: {
      name: 'newCustomers',
      title: t('statistics.newCustomers'),
      value: displayTimeInHHMM(visits),
    },
    oldCustomers: {
      name: 'oldCustomers',
      title: t('statistics.oldCustomers'),
      value: displayTimeInHHMM(visits),
    },
  };
  const dataSize = {
    labels: data.behavior.value.map((item) => item.title),
    datasets: [
      {
        label: 'Behavior',
        data: data.behavior.value.map((item) => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 2,
      },
    ],
  };
  const dataAverage = {
    labels: [data.avgPriceForVisit.title, data.avgMoneyForVisit.title, data.moneyPerHour.title],
    datasets: [
      {
        label: 'Average',
        data: [data.avgPriceForVisit.value, data.avgMoneyForVisit.value, data.moneyPerHour.value],
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    pointLabelFontSize: 20,
    labels:{
      font: {
        size: 8,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels:{
          font: {
            size: 10
          }
        }
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
      subtitle:{
        display: false
      },
      scales: {
        x:{
          display: false
        }
      }
    },
  };
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);
  const dataFirstRow = [
    {
      title: data.customers.title,
      text: 'Total for this date',
      value: data.customers.value,
      icon: <FaDog />,
      color: '#6201ed',
    },
    {
      title: data.visits.title,
      text: 'Total for this date',
      value: data.visits.value,
      icon: <FaDog />,
      color: '#29c0b1',
    },
    {
      title: data.totalMoney.title,
      text: 'Total for this date',
      value: data.totalMoney.value,
      icon: <FaDog />,
      color: '#2c50ed',
    },
    {
      title: data.totalMoneyShop.title,
      text: 'Total for this date',
      value: data.totalMoneyShop.value,
      icon: <FaDog />,
      color: '#222437',
    },
    {
      title: data.premium.title,
      text: 'Total for this date',
      value: data.premium.value,
      icon: <FaDog />,
      color: '#6201ed',
    },
    {
      title: data.tip.title,
      text: 'Total for this date',
      value: data.tip.value,
      icon: <FaDog />,
      color: '#29c0b1',
    },
    {
      title: data.extra.title,
      text: 'Total for this date',
      value: data.extra.value,
      icon: <FaDog />,
      color: '#2c50ed',
    },
  ];
  return (
    <>
      <Grid1>
        {dataFirstRow.map((item, i) => (
          <div style={{ background: item.color }} key={i}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0' }}>
              <div style={{ padding: '0.6rem', borderRadius: '0.5rem', background: 'blue' }}>{item.icon}</div>
              <h3>{item.title}</h3>
            </div>
            <h4>{item.value}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </Grid1>
      <Grid2>
        <div>
          <h3>Average</h3>
          <div>
            <Bar data={dataAverage} options={options} />
          </div>
        </div>
        <div>
          <h3>Behavior</h3>
          <div>
            <Doughnut data={dataSize} options={options} />
          </div>
        </div>
      </Grid2>
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
    </>
  );
};

export default Statistics;
