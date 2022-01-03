import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import CardVisit from '../../organisms/CardVisit/CardVisit';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import { sortByTimestamp } from '../../../helpers/sortByTimestamp';

export const ContainerVisits = styled.div`
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;
  gap: 1rem;
  max-width: 1300px;
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
`;

export const Container = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

export const ContainerDiv = styled.div`
  padding: 2rem;
`;

const Visits = () => {
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(ListCustomersTestContext);
  const fetchVisits = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/visits');
    const resJSON = await res.json();
    setVisits(resJSON.allVisits);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVisits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const displayVisitsWithOptionalDate = (visits) => {
  //   if(visits){
  //     for (let i = 0; i < visits.length; i++) {
  //       <CardVisit visit={item} key={item._id} />
  //     }
  //   }
  // }

  return (
    <Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ContainerVisits>
          {visits &&
            sortByTimestamp(visits).map((item) => (
              // {index === 0 && <p>{item.visit}</p>}
              // {index > 0 && item.visit !== array[index - 1].visit && <p>{item.visit}</p>}
              <CardVisit visit={item} key={item._id} />
            ))}
        </ContainerVisits>
      )}
    </Container>
  );
};

export default Visits;
