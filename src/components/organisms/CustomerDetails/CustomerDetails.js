import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import Button from '../../atoms/Button/Button';
import VisitDetails from '../VisitDetails/VisitDetails';
import UniversalCardImgPlusDetails from '../UniversalCardImgPlusDetails/UniversalCardImgPlusDetails';
import Container3ElemInCol from '../../molecules/Container3ElemInCol/Container3ElemInCol';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerCardVisitDetails = styled.div`
  padding: 3rem;
  max-width: 1200px;
  min-width: 350px;
  margin: 0 auto;
  display: flex;
  //flex-wrap: wrap;
  overflow-x: auto;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.main100};

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
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
  min-height: 100vh;
  margin: 2rem;

  h2 {
    text-align: center;
  }
`;

export const DivToButtonMoreVisits = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const CustomerDetails = () => {
  const [customerDetails, setCustomerDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingVisits, setIsLoadingVisits] = useState(false);
  const [openVisits, setOpenVisits] = useState(false);
  const [visitsFetch, setVisitsFetch] = useState([]);
  const { dogOwner, address, birthday, breed, contactName, dogName, phone, size, visits } = customerDetails;
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData, t } = useContext(ListCustomersTestContext);
  const fetchCustomer = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/customers/' + id, {
      method: 'POST',
      headers: {
        'Content-type': 'application-json',
        Authorization: 'Bearer ' + userData.token,
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

  const handleEdit = () => {
    navigate(`/customers/${id}/edit`);
  };

  const handleAddVisit = () => {
    navigate(`/customers/${id}/addVisit`);
  };

  const handleOpenVisits = () => {
    setOpenVisits((prev) => !prev);
    const fetchVisits = async () => {
      setIsLoadingVisits(true);
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/customers/' + id + '/visits');
      const resJSON = await res.json();
      setVisitsFetch(resJSON.visits);
      setIsLoadingVisits(false);
    };
    fetchVisits();
  };
  const arrTexts = [t('formData.dogOwner'), dogOwner, t('formData.phone'), phone, t('formData.dogName'), dogName];
  const arrTexts2 = [t('formData.address'), address, t('formData.birthday'), birthday, t('formData.breed'), breed?.label];
  const arrTexts3 = [t('formData.size'), size?.label, t('navigation.visits'), visits?.length, t('lastVisit'), dogName];
  const arrValues = [visits, contactName, t('button.edit'), '100%', handleEdit];
  return (
    <Container>
      <Button text={t('button.back')} onClick={handleBack} width="90px" />
      <h2>{t('customers.customerDetails')}</h2>
      {!isLoading ? (
        <UniversalCardImgPlusDetails
          arrValues={arrValues}
          button2={[t('button.addVisit'), '100%', handleAddVisit]}
          flexProp="0 0 40%"
          width="100%"
          maxWidth="1200px"
          minWidth="650px"
          height="400px"
        >
          <Container3ElemInCol arrTexts={arrTexts} flexProp="0 0 20%" />
          <Container3ElemInCol arrTexts={arrTexts2} flexProp="0 0 20%" />
          <Container3ElemInCol arrTexts={arrTexts3} flexProp="0 0 20%" />
          <DivToButtonMoreVisits>
            <Button text={openVisits ? t('button.watchVisits') : t('button.hideVisits')} onClick={handleOpenVisits} />
          </DivToButtonMoreVisits>
        </UniversalCardImgPlusDetails>
      ) : (
        <LoadingSpinner />
      )}
      {openVisits && (
        <div>
          <h2>Visits Total: {visitsFetch?.length} </h2>
          {!isLoadingVisits ? (
            visitsFetch.map((item) => (
              <VisitDetails offCustomContainerStyles idProp={item._id} key={item._id} visitProp={item} customerProp={customerDetails} />
            ))
          ) : (
            <LoadingSpinner />
          )}
        </div>
      )}
    </Container>
  );
};

export default CustomerDetails;
