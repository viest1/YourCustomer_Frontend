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
  input{
    background-color: ${({ theme }) => (theme.color.lighterBackground ? theme.color.black : theme.color.white)};
    border-radius: 8px;
    padding: 0.7rem;
    border: 1px solid hsl(0, 0%, 80%);
    margin-bottom: 0.5rem;
    &:focus {
      outline: 2px solid #2684ff;
    }
  }
`;

const Statistics = () => {
  const [visits, setVisits] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filteringVisits, setFilteringVisits] = useState([]);
  const [filteringCustomers, setFilteringCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateStats, setDateStats] = useState('');
  const { userData } = useContext(ListCustomersTestContext);
  const todayDateMonth = `${new Date().getFullYear()}-${
    new Date().getMonth() < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`
  }`;
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

  useEffect(() => {
    setFilteringCustomers(customers.filter(item => item.visits.map(item => item.visit.slice(0,7) === dateStats).includes(true)))
    setFilteringVisits(visits.filter((item) => item.visit?.slice(0, 7) === dateStats));
  }, [dateStats]);

  return (
    <ContainerStatistics>
      <input type="month" min="2020-11" max={todayDateMonth} value={dateStats} onChange={(e) => setDateStats(e.target.value)} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <CardOverall customers={dateStats ? filteringCustomers : customers} visits={dateStats ? filteringVisits : visits} dateStats={dateStats ? dateStats : 'Overall Time'} />
        </div>
      )}
    </ContainerStatistics>
  );
};

export default Statistics;
