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
