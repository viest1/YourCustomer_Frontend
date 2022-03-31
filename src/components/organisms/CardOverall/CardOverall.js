import React from 'react';
import { shopProducts } from '../../../data/shop';
import { averageTimeInMinutes, averageValue, displayTimeInHHMM, sum, sumValue } from '../../../helpers/statistics';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Grid1, Grid2, ContainerBar, ContainerDoughnut } from './CardOverall.styles';
import { FaDog } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Statistics = ({ customers, visits, dateStats = 'Overall Time', t }) => {
  // const ref = useRef()
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
      value: Object.entries(shopItems()).map((item, index) => ({ title: item[0], value: item[1] })),
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
      value: customers.filter((item) => item.visits.length === 1).length,
    },
    oldCustomers: {
      name: 'oldCustomers',
      title: t('statistics.oldCustomers'),
      value: customers.filter((item) => item.visits.length > 1).length,
    },
  };
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        // beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const optionsShop = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 140,
          minRotation: 50,
        },
        grid: {
          display: false,
        },
      },
      y: {
        // beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const optionsDoughnut = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          display: false,
        },
        // beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
  const backgroundColorSchema = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
  ];

  const dataBehavior = {
    labels: data.behavior.value.map((item) => item.title),
    datasets: [
      {
        label: 'Behavior',
        data: data.behavior.value.map((item) => item.value),
        backgroundColor: backgroundColorSchema,
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 3,
      },
    ],
  };
  const dataSize = {
    labels: data.size.value.map((item) => item.title),
    datasets: [
      {
        label: 'Size',
        data: data.size.value.map((item) => item.value),
        backgroundColor: backgroundColorSchema,
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 3,
      },
    ],
  };
  const dataService = {
    labels: data.service.value.map((item) => item.title),
    datasets: [
      {
        label: 'Service',
        data: data.service.value.map((item) => item.value),
        backgroundColor: backgroundColorSchema,
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 3,
      },
    ],
  };
  const dataAverage = {
    // labels: [data.avgPriceForVisit.title, data.avgMoneyForVisit.title, data.moneyPerHour.title],
    labels: ['Visit', 'Visit + Extra', 'per Hour'],
    datasets: [
      {
        label: 'Average Money for',
        data: [data.avgPriceForVisit.value, data.avgMoneyForVisit.value, data.moneyPerHour.value],
        backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  const dataShop = {
    labels: data.shopItems.value.map((item) => item.title),
    datasets: [
      {
        label: 'Sold items',
        data: data.shopItems.value.map((item) => item.value),
        backgroundColor: backgroundColorSchema,
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 3,
        borderRadius: 10,
      },
    ],
  };

  const dataGender = {
    labels: data.gender.value.map((item) => item.title),
    datasets: [
      {
        label: 'Gender',
        data: data.gender.value.map((item) => item.value),
        backgroundColor: backgroundColorSchema,
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 3,
      },
    ],
  };

  // color: '#29c0b1',

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
      color: '#2c50ed',
    },
    {
      title: data.totalMoney.title,
      text: 'Total for this date',
      value: data.totalMoney.value,
      icon: <FaDog />,
      color: '#222437',
    },
    {
      title: data.totalMoneyShop.title,
      text: 'Total for this date',
      value: data.totalMoneyShop.value,
      icon: <FaDog />,
      color: '#6201ed',
    },
    {
      title: data.premium.title,
      text: 'Total for this date',
      value: data.premium.value,
      icon: <FaDog />,
      color: '#2c50ed',
    },
    {
      title: data.tip.title,
      text: 'Total for this date',
      value: data.tip.value,
      icon: <FaDog />,
      color: '#222437',
    },
    {
      title: data.extra.title,
      text: 'Total for this date',
      value: data.extra.value,
      icon: <FaDog />,
      color: '#6201ed',
    },
    {
      title: data.avgTimeForVisit.title,
      text: 'Total for this date',
      value: data.avgTimeForVisit.value,
      icon: <FaDog />,
      color: '#2c50ed',
    },
    {
      title: data.newCustomers.title,
      text: 'Total for this date',
      value: data.newCustomers.value,
      icon: <FaDog />,
      color: '#222437',
    },
    {
      title: data.oldCustomers.title,
      text: 'Total for this date',
      value: data.oldCustomers.value,
      icon: <FaDog />,
      color: '#6201ed',
    },
  ];
  const optionsObserver = {
    triggerOnce: true,
    threshold: 0.5,
  };
  const [ref, inView] = useInView(optionsObserver);
  const [ref2, inView2] = useInView(optionsObserver);
  const [ref3, inView3] = useInView(optionsObserver);
  const [ref4, inView4] = useInView(optionsObserver);
  const [ref5, inView5] = useInView(optionsObserver);
  const [ref6, inView6] = useInView(optionsObserver);

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
        <div ref={ref6}>
          <p>Average</p>
          <p>Average values this date</p>
          <ContainerBar>{inView6 && <Bar data={dataAverage} options={options} type={'Bar'} />}</ContainerBar>
        </div>
        <div ref={ref5}>
          <p>Behavior</p>
          <p>Behavior your dogs on this date</p>
          <ContainerDoughnut>{inView5 && <Doughnut data={dataBehavior} options={optionsDoughnut} type={'Doughnut'} />}</ContainerDoughnut>
        </div>
        <div ref={ref4}>
          <p>Size</p>
          <p>Size your dogs on this date</p>
          <ContainerDoughnut>{inView4 && <Doughnut data={dataSize} options={optionsDoughnut} type={'Doughnut'} />}</ContainerDoughnut>
        </div>
        <div ref={ref3}>
          <p>Services</p>
          <p>Which services you had on this date</p>
          <ContainerDoughnut>{inView3 && <Doughnut data={dataService} options={optionsDoughnut} type={'Doughnut'} />}</ContainerDoughnut>
        </div>
        <div ref={ref2}>
          <p>Gender</p>
          <p>Gender type your dogs on this date</p>
          <ContainerDoughnut>{inView2 && <Doughnut data={dataGender} options={optionsDoughnut} type={'Doughnut'} />}</ContainerDoughnut>
        </div>
        <div ref={ref}>
          <p>Shop</p>
          <p>Shop items which you sold on this date: {data.shopSoldItems.value}</p>
          <ContainerBar>{inView && <Bar data={dataShop} options={optionsShop} type={'Bar'} />}</ContainerBar>
        </div>
      </Grid2>
    </>
  );
};

export default Statistics;
