import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import CardCustomer from '../../organisms/CardCustomer/CardCustomer';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import { sortByTimestamp } from '../../../helpers/sortByTimestamp';

export const ContainerCustomers = styled.div`
  padding: 2rem;
  //background: ${({ theme }) => theme.color.main100};
  //min-height: 100vh;
  display: flex;
  justify-content: center;
`;

export const ContainerCardsCustomer = styled.div`
  //padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  max-width: 1300px;
  //box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
`;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchingCustomers, isSearching, userData, t } = useContext(ListCustomersTestContext);
  const fetchCustomers = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/customers');
    const resJSON = await res.json();
    setCustomers(resJSON.allCustomers);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContainerCustomers>
      {isLoading ? (
        <LoadingSpinner />
      ) : searchingCustomers?.length || isSearching ? (
        <ContainerCardsCustomer>
          {sortByTimestamp(searchingCustomers)?.map((item) => (
            <CardCustomer t={t} item={item} key={item._id} />
          ))}
        </ContainerCardsCustomer>
      ) : (
        <ContainerCardsCustomer>
          {sortByTimestamp(customers).map((item) => (
            <CardCustomer t={t} item={item} key={item._id} />
          ))}
        </ContainerCardsCustomer>
      )}
    </ContainerCustomers>
  );
};

export default Customers;
