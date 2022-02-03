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
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { ContainerBar, ContainerDoughnut } from '../CardOverall/CardOverall.styles';
import { useInView } from 'react-intersection-observer';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

// export const ContainerCardVisitDetails = styled.div`
//   min-width: 350px;
//   display: flex;
//   overflow-x: auto;
//   justify-content: space-between;
//
//   * {
//     display: block;
//     width: 30%;
//     min-width: 250px;
//   }
//
//   img {
//     width: 200px;
//     min-width: 200px;
//     height: auto;
//     border-radius: 50%;
//     object-fit: cover;
//   }
//
//   button {
//     width: 80px !important;
//     min-width: 80px;
//   }
// `;

export const Container = styled.div`
  padding: 1rem;
  //box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
  min-height: 100vh;
  //margin: 2rem;
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
  //border-bottom: 1px solid grey;
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 550px));
  justify-content: center;
  max-width: 1660px;
  gap: 1rem;
  border-radius: 1rem;
  @media (max-width: 450px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
  const dataBehavior = {
    labels: visitsFetch.map((item) => item.visit),
    datasets: [
      {
        label: 'Behavior',
        data: visitsFetch.map((item) => item.price.value.split(' ')[0]),
        backgroundColor: backgroundColorSchema,
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 3,
      },
    ],
  };
  const dataSize = {
    labels: visitsFetch.map((item) => item.visit),
    datasets: [
      {
        label: 'Size',
        data: visitsFetch.map((item) => item.behavior.label),
        backgroundColor: backgroundColorSchema,
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 3,
      },
    ],
  };
  const dataService = {
    labels: visitsFetch.map((item) => item.visit),
    datasets: [
      {
        label: 'Service',
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
  const [ref4, inView4] = useInView(optionsObserver);
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
        <div ref={ref6}>
          <p>Average</p>
          <p>Average values this date</p>
          <ContainerBar>{inView6 && <Bar data={dataService} options={options} type={'Bar'} />}</ContainerBar>
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
