import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import Button from '../../atoms/Button/Button';
import VisitDetails from '../VisitDetails/VisitDetails';
import UniversalCardImgPlusDetails from '../UniversalCardImgPlusDetails/UniversalCardImgPlusDetails';
import Container3ElemInCol from '../../molecules/Container3ElemInCol/Container3ElemInCol';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import RoundedImageWithArrows from '../../molecules/RoundedImageWithArrows/RoundedImageWithArrows';
import DotsDropdown from '../../molecules/DotsDropdown/DotsDropdown';
import CardVisit, { ContainerCard, ContainerComment, ContainerDates, ContainerOneRow } from '../CardVisit/CardVisit';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { sortByTimestamp } from '../../../helpers/sortByTimestamp';
import CardCustomer from '../CardCustomer/CardCustomer';

export const ContainerCardVisitDetails = styled.div`
  //padding: 3rem;
  max-width: 1200px;
  min-width: 350px;
  margin: 0 auto;
  display: flex;
  //flex-wrap: wrap;
  overflow-x: auto;
  justify-content: space-between;
  //background: ${({ theme }) => theme.color.main100};

  * {
    display: block;
    width: 30%;
    min-width: 250px;
  }

  img {
    width: 200px;
    min-width: 200px;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
  }

  button {
    width: 80px !important;
    min-width: 80px;
  }
`;

export const Container = styled.div`
  padding: 1rem;
  //box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
  min-height: 100vh;
  //margin: 2rem;

  h2 {
    text-align: center;
  }
`;

export const DivToButtonMoreVisits = styled.div`
  //position: absolute;
  //top: 0;
  //left: 0;
`;

export const ContainerButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0 1rem 0;
`;

export const ContainerGridVisits = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 1300px;
  border-radius: 1rem;
  @media (max-width: 450px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const CustomerDetails = () => {
  const [customerDetails, setCustomerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVisits, setIsLoadingVisits] = useState(false);
  const [openVisits, setOpenVisits] = useState(false);
  const [visitsFetch, setVisitsFetch] = useState([]);
  // const { dogOwner, address, birthday, breed, contactName, dogName, phone, size, visits } = customerDetails;
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

  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    navigate(-1);
  };



  const handleOpenVisits = () => {
    setOpenVisits((prev) => !prev);
    const fetchVisits = async () => {
      setIsLoadingVisits(true);
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/customers/' + id + '/visits',
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + userData?.token,
          }});
      const resJSON = await res.json();
      setVisitsFetch(resJSON.visits);
      setIsLoadingVisits(false);
    };
    fetchVisits();
  };
  // const arrTexts = [t('formData.dogOwner'), dogOwner, t('formData.phone'), phone, t('formData.dogName'), dogName];
  // const arrTexts2 = [t('formData.address'), address, t('formData.birthday'), birthday, t('formData.breed'), breed?.label];
  // const arrTexts3 = [t('formData.size'), size?.label, t('navigation.visits'), visits?.length, t('lastVisit'), dogName];
  // const arrValues = [visits, contactName, t('button.edit'), '100%', handleEdit];

  // const handleDetailsVisit = () => {
  //   navigate(`/visits/${_id}`);
  // };
  // const handleDetailsCustomer = () => {
  //   navigate(`/customers/${customer._id}`);
  // };

  // const arrTexts = [t('visit.time'), time, t('visit.price'), price?.label, t('visit.visit'), visit];
  // const arrValues = [photo, customer?.contactName, t('button.details'), '100%', handleDetails];

  const calcSum = (itemVisit) => {
    const premiumValue = itemVisit.premium.reduce((a, b) => {
      a += +b.value;
      return +a;
    }, 0);
    const extraPayValue = +itemVisit.extraPay?.value;
    const priceValue = +itemVisit.price?.value?.split(' ')[0];
    const sumPrice = premiumValue + extraPayValue + priceValue;
    return sumPrice;
  };



  // const data = [
  //   {
  //     title: t('visit.visit'),
  //     value: visit,
  //   },
  //   {
  //     title: t('visit.price'),
  //     value: (
  //       <>
  //         {price?.label} / <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#6201ed' }}>{sumPrice}</span>
  //       </>
  //     ),
  //   },
  //   {
  //     title: t('visit.time'),
  //     value: time,
  //   },
  //   {
  //     title: t('formVisit.premium'),
  //     value: premium?.map((item) => ' ' + item.label),
  //   },
  //   {
  //     title: t('formVisit.extraPay'),
  //     value: extraPay?.label,
  //   },
  //   {
  //     title: t('formVisit.behavior'),
  //     value: behavior?.label,
  //   },
  // ];

  return (
    <Container>
      <ContainerButtons>
        <Button text={t('button.back')} onClick={handleBack} width="90px" />
        <DivToButtonMoreVisits>
          <Button text={!openVisits ? t('button.watchVisits') : t('button.hideVisits')} onClick={handleOpenVisits} />
        </DivToButtonMoreVisits>
      </ContainerButtons>
      <h2>{t('customers.customerDetails')}</h2>
      <ContainerGridVisits>
        {!isLoading ? (
          <CardCustomer customer={customerDetails} t={t} noCustomerDetails />
        ) : (
          <LoadingSpinner />
        )}
      </ContainerGridVisits>
      {openVisits && (
        <div>
          <h2>Visits Total: {visitsFetch?.length} </h2>
          <ContainerGridVisits>
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
