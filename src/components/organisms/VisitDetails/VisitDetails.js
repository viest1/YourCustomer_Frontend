import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import Button from '../../atoms/Button/Button';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import CardVisit from '../CardVisit/CardVisit';

export const ContainerCardVisitDetails = styled.div`
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
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
  min-height: 100vh;
  max-width: 500px;
  margin: 0 auto;
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
  const [isLoading, setIsLoading] = useState(true);
  const [isVisitProp, setIsVisitProp] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData, t } = useContext(ListCustomersTestContext);

  const fetchVisit = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/visits/' + id, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container offCustomContainerStyles>
      {!isVisitProp && <Button text={t('button.back')} onClick={handleBack} width="90px" />}
      {!offCustomContainerStyles && <h2>{t('visit.visitDetails')}</h2>}
      {!isLoading ? <CardVisit visit={visitDetails} t={t} visitDetails /> : <LoadingSpinner />}
    </Container>
  );
};

export default VisitDetails;
