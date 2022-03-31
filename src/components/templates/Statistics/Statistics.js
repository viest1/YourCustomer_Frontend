import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import CardOverall from '../../organisms/CardOverall/CardOverall';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import Button from '../../atoms/Button/Button';

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
    color: black;

    &:focus {
      outline: 2px solid #2684ff;
    }
  }
`;

const ContainerFlexDates = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FlexDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 200px;
  label,
  button {
    margin-left: 1rem;
  }
  input {
    width: 170px;
  }
  button {
    width: 170px;
  }
`;

const Statistics = () => {
  const [visits, setVisits] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filteringVisits, setFilteringVisits] = useState([]);
  const [filteringCustomers, setFilteringCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateStats, setDateStats] = useState(`${new Date().toISOString().slice(0, 7)}`);
  const [errorMessage, setErrorMessage] = useState();
  const { userData, t } = useContext(ListCustomersTestContext);
  const todayDateMonth = `${new Date().getFullYear()}-${
    new Date().getMonth() < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`
  }`;
  const fetchCustomers = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/customers/role/premium', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
        Role: userData.role,
      },
    });
    const resJSON = await res.json();
    if (resJSON.error) {
      setErrorMessage(resJSON.message);
      console.log(resJSON.message);
      return;
    }
    setCustomers(resJSON.allCustomers);
    const resVisits = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/visits/role/premium', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
        Role: userData.role,
      },
    });
    const resJSONVisits = await resVisits.json();
    setVisits(resJSONVisits.allVisits);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // setFilteringCustomers(customers.filter((item) => item.visits.map((item) => item.visit.slice(0, 7) === dateStats).includes(true)));
    // setFilteringVisits(visits.filter((item) => item.visit?.slice(0, 7) === dateStats));
    setFilteringCustomers(customers?.filter((item) => item.visits?.map((item) => item?.visit?.startsWith(dateStats)).includes(true)));
    setFilteringVisits(visits?.filter((item) => item?.visit?.startsWith(dateStats)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateStats, isLoading]);

  return (
    <ContainerStatistics>
      <ContainerFlexDates>
        <FlexDate>
          <label htmlFor="dayDate">Choose Day</label>
          <input type="date" id="dayDate" value={dateStats} onChange={(e) => setDateStats(e.target.value)} />
        </FlexDate>
        <FlexDate>
          <label htmlFor="monthDate">Choose Month</label>
          <input type="month" id="monthDate" min="2020-11" max={todayDateMonth} value={dateStats} onChange={(e) => setDateStats(e.target.value)} />
        </FlexDate>
        <FlexDate>
          <label htmlFor="yearDate">Choose Year</label>
          <input type="number" id="yearDate" min="2020-11" max={todayDateMonth} value={dateStats} onChange={(e) => setDateStats(e.target.value)} />
        </FlexDate>
        <FlexDate>
          <label htmlFor="overallDate">Display All</label>
          <Button text="Display All" id="overallDate" onClick={() => setDateStats('')} />
        </FlexDate>
      </ContainerFlexDates>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>{errorMessage ? <p>{errorMessage}</p> : <LoadingSpinner />}</div>
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
