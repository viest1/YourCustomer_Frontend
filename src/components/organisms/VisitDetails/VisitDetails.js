import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import Button from '../../atoms/Button/Button';
import UniversalCardImgPlusDetails from '../UniversalCardImgPlusDetails/UniversalCardImgPlusDetails';
import Container3ElemInCol from '../../molecules/Container3ElemInCol/Container3ElemInCol';
import { DivToButtonMoreVisits } from '../CustomerDetails/CustomerDetails';

export const ContainerCardVisitDetails = styled.div`
  padding: 3rem;
  max-width: 1200px;
  min-width: 350px;
  margin: 2rem auto 2rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.main100};
  box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
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
  ${({ offCustomContainerStyles }) =>
    offCustomContainerStyles &&
    `
  box-shadow: none;
  min-height:auto;
  `}

  h2 {
    text-align: center;
  }
`;

const VisitDetails = ({ visitProp, customerProp, idProp, offCustomContainerStyles }) => {
  const [visitDetails, setVisitDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisitProp, setIsVisitProp] = useState();
  const { behavior, extra, customer, message, photo, premium, price, service, shop, time, tip, visit, hour } = visitDetails;
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchVisit = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/visits/' + id, {
      method: 'POST',
      headers: {
        'Content-type': 'application-json',
      },
    });
    const resJSON = await res.json();
    setVisitDetails(resJSON);
    setIsLoading(false);
  };

  useEffect(() => {
    if (visitProp) {
      setVisitDetails(visitProp);
      setIsVisitProp(true);
    } else {
      fetchVisit();
      setIsVisitProp(false);
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    if (idProp) {
      navigate(`/visits/${idProp}/edit`);
    } else {
      navigate(`/visits/${id}/edit`);
    }
  };

  const handleOpenCustomerDetails = () => {
    navigate(`/customers/${customerProp?._id || customer?._id}`);
  };

  const arrTexts = ['Visit Date:', visit, 'Visit Hour:', hour, 'Behavior:', behavior?.value];
  const arrTexts2 = ['Extra:', extra?.label, 'Message:', message, 'Premium:', premium?.label];
  const arrTexts3 = [
    'Price:',
    price?.value,
    'Service:',
    service?.value,
    'Shop',
    shop?.map((item, index) => (
      <li style={{ listStyle: 'none' }}>
        {index + 1}. {item.label}
      </li>
    )),
  ];
  const arrTexts4 = ['Time:', time, 'Tip:', tip, 'Empty', ''];
  const arrValues = [visit, customerProp?.contactName || customer?.contactName, 'Edit', '100%', handleEdit];
  return (
    <Container offCustomContainerStyles>
      {!isVisitProp && <Button text="Back" onClick={handleBack} width="80px" />}
      {!offCustomContainerStyles && <h2>Visit Details</h2>}
      {!isLoading ? (
        <UniversalCardImgPlusDetails
          photo={photo || visitProp?.photo || ''}
          arrValues={arrValues}
          flexProp="0 0 24%"
          width="100%"
          maxWidth="1300px"
          minWidth="700px"
          height="300px"
          container1Padding="1rem"
        >
          <Container3ElemInCol arrTexts={arrTexts} flexProp="0 0 19%" />
          <Container3ElemInCol arrTexts={arrTexts2} flexProp="0 0 19%" />
          <Container3ElemInCol arrTexts={arrTexts3} flexProp="0 0 19%" />
          <Container3ElemInCol arrTexts={arrTexts4} flexProp="0 0 19%" />
          {!visitProp && (
            <DivToButtonMoreVisits>
              <Button text="Go to Customer Data" onClick={handleOpenCustomerDetails} />
            </DivToButtonMoreVisits>
          )}
        </UniversalCardImgPlusDetails>
      ) : (
        <LoadingSpinner />
      )}
    </Container>
  );
};

export default VisitDetails;
