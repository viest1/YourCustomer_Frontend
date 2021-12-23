import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import CardOverall from '../../organisms/CardOverall/CardOverall';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerStatistics = styled.div`
  padding: 2rem;
  max-width: 1360px;
  margin: 2rem auto 2rem auto;
  box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
`;

const Statistics = () => {
  const [visits, setVisits] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {userData} = useContext(ListCustomersTestContext)
  const fetchCustomers = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/customers');
    const resJSON = await res.json();
    setCustomers(resJSON.allCustomers);
    const resVisits = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/visits');
    const resJSONVisits = await resVisits.json();
    setVisits(resJSONVisits.allVisits);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return <ContainerStatistics>{isLoading ? <LoadingSpinner /> : <CardOverall customers={customers} visits={visits} />}</ContainerStatistics>;
};

export default Statistics;
