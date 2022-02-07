import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import Button from '../../atoms/Button/Button';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import CardVisit from '../CardVisit/CardVisit';
import { sortByTimestamp } from '../../../helpers/sortByTimestamp';
import CardCustomer from '../CardCustomer/CardCustomer';
import { MdArrowBack } from 'react-icons/md';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { ContainerBar } from '../CardOverall/CardOverall.styles';
import { useInView } from 'react-intersection-observer';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

export const Container = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  min-height: 100vh;
  max-width: 95%;
  margin: 0 auto;

  h2 {
    text-align: center;
    padding: 1rem 0 1rem 0;
    text-decoration: underline black dotted;
  }
  @media (min-width: 1660px) {
    max-width: 1660px;
  }
`;

export const DivToButtonMoreVisits = styled.div``;

export const ContainerButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0 1rem 0;
`;

export const ContainerGridVisits = styled.div`
  display: grid;
  grid-template-columns: ${({ visitsLessThan2 }) =>
    visitsLessThan2 ? 'repeat(auto-fit, minmax(250px, 550px))' : 'repeat(auto-fit, minmax(250px, 1fr))'};
  justify-content: ${({ visitsLessThan2 }) => (visitsLessThan2 ? 'center' : 'flex-start')};
  gap: 1rem;
  max-width: 1660px;
  border-radius: 1rem;
  @media (max-width: 450px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;
export const ContainerGridCustomer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-content: center;
  max-width: 1660px;
  gap: 1rem;
  border-radius: 1rem;
  @media (max-width: 450px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

export const ContainerStatCard = styled.div`
  box-shadow: ${({ theme }) => (theme.color.lighterBackground ? `1px 1px 2px 2px rgba(255, 255, 255, 0.05)` : `1px 1px 2px 2px rgba(0, 0, 0, 0.15)`)};
  padding: 1rem;
  border-radius: 0.6rem;
  p:first-child {
    font-weight: bold;
  }
`;

const CustomerDetails = () => {
  const [customerDetails, setCustomerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVisits, setIsLoadingVisits] = useState(false);
  const [openVisits, setOpenVisits] = useState(true);
  const [visitsFetch, setVisitsFetch] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData, t } = useContext(ListCustomersTestContext);
  const fetchCustomer = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/customers/' + id, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
      },
    });
    const resJSON = await res.json();
    setCustomerDetails(resJSON);
    setIsLoading(false);
  };
  const fetchVisits = async () => {
    setIsLoadingVisits(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/customers/' + id + '/visits', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
      },
    });
    const resJSON = await res.json();
    setVisitsFetch(resJSON.visits);
    setIsLoadingVisits(false);
  };

  useEffect(() => {
    fetchCustomer();
    fetchVisits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenVisits = () => {
    setOpenVisits((prev) => !prev);
    fetchVisits();
  };

  const backgroundColorSchema = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
  ];

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

  // const optionsShop = {
  //   maintainAspectRatio: false,
  //   scales: {
  //     x: {
  //       ticks: {
  //         autoSkip: false,
  //         maxRotation: 140,
  //         minRotation: 50,
  //       },
  //       grid: {
  //         display: false,
  //       },
  //     },
  //     y: {
  //       // beginAtZero: true,
  //       grid: {
  //         display: false,
  //       },
  //     },
  //   },
  // };
  // console.log(visitsFetch);
  // const optionsDoughnut = {
  //   maintainAspectRatio: false,
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false,
  //         drawBorder: false,
  //         drawTicks: false,
  //       },
  //       ticks: {
  //         display: false,
  //       },
  //     },
  //     y: {
  //       grid: {
  //         display: false,
  //         drawBorder: false,
  //         drawTicks: false,
  //       },
  //       ticks: {
  //         display: false,
  //       },
  //       // beginAtZero: true,
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       position: 'bottom',
  //     },
  //   },
  // };
  const dataPrice = {
    labels: visitsFetch.map((item) => item.visit),
    datasets: [
      {
        label: 'Price',
        data: visitsFetch.map((item) => item.price.value.split(' ')[0]),
        backgroundColor: backgroundColorSchema,
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 3,
      },
    ],
  };
  // const dataSize = {
  //   labels: visitsFetch.map((item) => item.visit),
  //   datasets: [
  //     {
  //       label: 'Time',
  //       data: visitsFetch.map((item) => +(+item.time.split(':')[0] + '.' + +item.time.split(':')[1])),
  //       backgroundColor: backgroundColorSchema,
  //       borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
  //       borderWidth: 3,
  //     },
  //   ],
  // };
  const dataBehavior = {
    labels: visitsFetch.map((item) => item.visit),
    datasets: [
      {
        label: 'Behavior',
        data: visitsFetch.map((item) => item.behavior.label),
        backgroundColor: backgroundColorSchema,
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 3,
      },
    ],
  };
  const optionsObserver = {
    triggerOnce: true,
    threshold: 0.5,
  };
  // const [ref4, inView4] = useInView(optionsObserver);
  const [ref5, inView5] = useInView(optionsObserver);
  const [ref6, inView6] = useInView(optionsObserver);

  return (
    <Container>
      <ContainerButtons>
        <Button icon={<MdArrowBack fill={'white'} fontSize={16} />} text={t('button.back')} onClick={handleBack} width="90px" />
        <DivToButtonMoreVisits>
          <Button
            icon={!openVisits ? <IoIosEye fill={'white'} fontSize={16} /> : <IoIosEyeOff fill={'white'} fontSize={16} />}
            text={!openVisits ? t('button.watchVisits') : t('button.hideVisits')}
            onClick={handleOpenVisits}
          />
        </DivToButtonMoreVisits>
      </ContainerButtons>
      <h2 style={{ borderTop: '1px solid grey' }}>{t('customers.customerDetails')}</h2>
      <ContainerGridCustomer>
        {!isLoading ? <CardCustomer customer={customerDetails} t={t} noCustomerDetails /> : <LoadingSpinner />}
        <ContainerStatCard ref={ref6}>
          <p>Behavior</p>
          <p>History behavior from this dog</p>
          <ContainerBar>{inView6 && <Line data={dataBehavior} options={options} type={'Line'} />}</ContainerBar>
        </ContainerStatCard>
        <ContainerStatCard ref={ref5}>
          <p>Price</p>
          <p>History price from this dog</p>
          <ContainerBar>{inView5 && <Bar data={dataPrice} options={options} type={'Bar'} />}</ContainerBar>
        </ContainerStatCard>
        {/*<div ref={ref4}>*/}
        {/*  <p>Size</p>*/}
        {/*  <p>Size your dogs on this date</p>*/}
        {/*  <ContainerBar>{inView4 && <Line data={dataSize} options={options} type={'Line'} />}</ContainerBar>*/}
        {/*</div>*/}
      </ContainerGridCustomer>
      {openVisits && (
        <div>
          <h2>Visits Total: {visitsFetch?.length} </h2>
          <ContainerGridVisits visitsLessThan2={visitsFetch?.length < 2}>
            {!isLoadingVisits ? (
              sortByTimestamp(visitsFetch).map((itemVisit, i) => (
                // <VisitDetails offCustomContainerStyles idProp={item._id} key={item._id} visitProp={item} customerProp={customerDetails} />
                <CardVisit visit={itemVisit} key={i} t={t} customerName={customerDetails?.contactName} noCustomerDetails />
              ))
            ) : (
              <LoadingSpinner />
            )}
          </ContainerGridVisits>
        </div>
      )}
    </Container>
  );
};

export default CustomerDetails;
