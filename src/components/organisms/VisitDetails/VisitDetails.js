import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import Button from '../../atoms/Button/Button';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import CardVisit from '../CardVisit/CardVisit';
import { MdArrowBack } from 'react-icons/md';

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
  border-radius: 1rem;
  max-width: 500px;
  margin: 0 auto;
  ${({ offCustomContainerStyles }) =>
    offCustomContainerStyles &&
    `
  box-shadow: none;
  min-height:auto;
  `}
  > h2 {
    text-align: center;
    text-decoration: underline dotted;
  }
  > div:first-child {
    //box-shadow: 0px 4px 6px ${({ themeType }) => themeType.layout};
    //border-bottom: 1px solid black;
  }
`;

const VisitDetails = ({ visitProp }) => {
  const [visitDetails, setVisitDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData, t, themeType } = useContext(ListCustomersTestContext);

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
    } else {
      fetchVisit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container themeType={themeType}>
      <div style={{ borderBottom: '1px solid grey', padding: '0 0 1rem 0' }}>
        <Button text={t('button.back')} onClick={handleBack} icon={<MdArrowBack fill={'white'} />} />
      </div>
      <h2>{t('visit.visitDetails')}</h2>
      {!isLoading ? <CardVisit visit={visitDetails} t={t} visitDetails /> : <LoadingSpinner />}
    </Container>
  );
};

export default VisitDetails;
