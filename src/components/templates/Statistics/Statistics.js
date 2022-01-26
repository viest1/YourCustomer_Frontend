import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import CardOverall from '../../organisms/CardOverall/CardOverall';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerStatistics = styled.div`
  //padding: 2rem;
  max-width: 1660px;
  margin: 0.5rem auto 0 auto;
  //margin: 2rem auto 2rem auto;
  //box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
  //background:grey;

  input {
    margin-left: 1rem;
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
  const [isLoading, setIsLoading] = useState(true);
  const [dateStats, setDateStats] = useState('');
  const { userData, t } = useContext(ListCustomersTestContext);
  const todayDateMonth = `${new Date().getFullYear()}-${
    new Date().getMonth() < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`
  }`;
  const fetchCustomers = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/customers',
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + userData?.token,
        }});
    const resJSON = await res.json();
    setCustomers(resJSON.allCustomers);
    const resVisits = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/visits',{
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
      }});
    const resJSONVisits = await resVisits.json();
    setVisits(resJSONVisits.allVisits);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteringCustomers(customers.filter((item) => item.visits.map((item) => item.visit.slice(0, 7) === dateStats).includes(true)));
    setFilteringVisits(visits.filter((item) => item.visit?.slice(0, 7) === dateStats));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateStats]);

  return (
    <ContainerStatistics>
      <input type="month" min="2020-11" max={todayDateMonth} value={dateStats} onChange={(e) => setDateStats(e.target.value)} />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          {customers && (
            <CardOverall
              t={t}
              customers={dateStats ? filteringCustomers : customers}
              visits={dateStats ? filteringVisits : visits}
              dateStats={dateStats ? dateStats : t('statistics.overallTime')}
            />
          )}
        </div>
      )}
    </ContainerStatistics>
  );
};

export default Statistics;
