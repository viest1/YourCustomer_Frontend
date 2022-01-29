import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import CardVisit from '../../organisms/CardVisit/CardVisit';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import { sortByTimestamp } from '../../../helpers/sortByTimestamp';
import { IoIosArrowDown } from 'react-icons/io';
import { ContainerFilters, ContainerOptionsSort, ContainerWithBackground, FilterButton } from '../Customers/Customers';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { FcCheckmark } from 'react-icons/fc';

export const ContainerVisits = styled.div`
  padding: 0.3rem;
  margin: 1.2rem auto 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  border-radius: 1rem;
  max-width: 95%;
  @media (max-width: 535px) {
    grid-template-columns: repeat(auto-fit, minmax(230px, 400px));
    justify-content: center;
  }
`;

const Visits = () => {
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [withPhoto, setWithPhoto] = useState(false);
  const { userData, t, themeType } = useContext(ListCustomersTestContext);
  const fetchVisits = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/visits', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
      },
    });
    const resJSON = await res.json();
    setVisits(resJSON.allVisits);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVisits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [filteringCustomers, setFilteringCustomers] = useState([]);
  const [openSortOptions, setOpenSortOptions] = useState(false);
  const [openNumberResultsOptions, setOpenNumberResultsOptions] = useState(false);
  const [numberFilterResults, setNumberFilterResults] = useState(10);
  const calcSum = (itemVisit) => {
    const premiumValue = itemVisit.premium.reduce((a, b) => {
      a += +b.value;
      return +a;
    }, 0);
    const extraPayValue = +itemVisit.extraPay?.value;
    const priceValue = +itemVisit.price?.value?.split(' ')[0];
    const sumPrice = premiumValue + extraPayValue + priceValue;
    return sumPrice;
  };
  const reducer = (state, action) => {
    let sortedArr = [];
    switch (action.type) {
      case 'Newest Created':
        if (withPhoto) {
          sortedArr = [...visits]
            ?.filter((item) => item.photo)
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, numberFilterResults);
        } else {
          sortedArr = [...visits]?.sort((a, b) => b.timestamp - a.timestamp).slice(0, numberFilterResults);
        }
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Oldest Created':
        sortedArr = [...visits]?.sort((a, b) => a.timestamp - b.timestamp).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Most Expensive':
        sortedArr = [...visits]?.sort((a, b) => calcSum(b) - calcSum(a)).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Cheapest':
        sortedArr = [...visits]?.sort((a, b) => calcSum(a) - calcSum(b)).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Best Behavior':
        sortedArr = [...visits]?.sort((a, b) => b.behavior?.label?.localeCompare(a.behavior?.label)).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Worst Behavior':
        sortedArr = [...visits]?.sort((a, b) => a.behavior?.label?.localeCompare(b.behavior?.label)).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Last Visit':
        sortedArr = [...visits]?.sort((a, b) => new Date(b.visit).getTime() - new Date(a.visit).getTime()).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Oldest Visit':
        sortedArr = [...visits]?.sort((a, b) => new Date(a.visit).getTime() - new Date(b.visit).getTime()).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      default:
        setFilteringCustomers(filteringCustomers.filter((item) => item.photo));
        return { ...state };
    }
  };
  const [state, dispatch] = useReducer(reducer, { type: 'Last Visit' });
  const ref = useRef();
  useOnClickOutside(ref, () => setOpenSortOptions(false));
  const refResults = useRef();
  useOnClickOutside(refResults, () => setOpenNumberResultsOptions(false));
  useEffect(() => {
    dispatch({ type: state.type });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberFilterResults]);
  useEffect(() => {
    dispatch({ type: state.type });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withPhoto]);

  return (
    <>
      <ContainerWithBackground themeType={themeType}>
        <ContainerFilters>
          <FilterButton ref={ref} open={openSortOptions} themeType={themeType}>
            <p>Sort By {state.type}</p>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <IoIosArrowDown color={'white'} onClick={() => setOpenSortOptions((prev) => !prev)} />
            </span>
            {openSortOptions && (
              <ContainerOptionsSort themeType={themeType}>
                <ul onClick={() => setOpenSortOptions(false)}>
                  <li onClick={() => dispatch({ type: 'Newest Created' })}>Newest Created</li>
                  <li onClick={() => dispatch({ type: 'Oldest Created' })}>Oldest Created</li>
                  <li onClick={() => dispatch({ type: 'Last Visit' })}>Last Visit</li>
                  <li onClick={() => dispatch({ type: 'Oldest Visit' })}>Oldest Visit</li>
                  <li onClick={() => dispatch({ type: 'Most Expensive' })}>Most Expensive</li>
                  <li onClick={() => dispatch({ type: 'Cheapest' })}>Cheapest</li>
                  <li onClick={() => dispatch({ type: 'Best Behavior' })}>Best Behavior</li>
                  <li onClick={() => dispatch({ type: 'Worst Behavior' })}>Worst Behavior</li>
                </ul>
              </ContainerOptionsSort>
            )}
          </FilterButton>
          <FilterButton ref={refResults} themeType={themeType}>
            <p>Results {numberFilterResults}</p>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <IoIosArrowDown color={'white'} onClick={() => setOpenNumberResultsOptions((prev) => !prev)} />
            </span>
            {openNumberResultsOptions && (
              <ContainerOptionsSort width={'120px'} themeType={themeType}>
                <ul onClick={() => setOpenNumberResultsOptions(false)}>
                  <li onClick={() => setNumberFilterResults(10)}>10</li>
                  <li onClick={() => setNumberFilterResults(20)}>20</li>
                  <li onClick={() => setNumberFilterResults(50)}>50</li>
                  <li onClick={() => setNumberFilterResults(100)}>100</li>
                  <li onClick={() => setNumberFilterResults(200)}>200</li>
                  <li onClick={() => setNumberFilterResults(999999)}>All</li>
                </ul>
              </ContainerOptionsSort>
            )}
          </FilterButton>
          <FilterButton themeType={themeType}>
            <p>With Photo</p>
            <span
              style={{ display: 'flex', alignItems: 'center', border: '2px solid white', background: 'white', borderRadius: '0.2rem' }}
              onClick={() => setWithPhoto((prev) => !prev)}
            >
              {withPhoto ? <FcCheckmark width={12} fontSize={12} /> : <span style={{ height: '12px', width: '12px' }} />}
            </span>
          </FilterButton>
        </ContainerFilters>
      </ContainerWithBackground>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <LoadingSpinner />
        </div>
      ) : (
        <ContainerVisits>
          {visits &&
            !filteringCustomers.length &&
            sortByTimestamp(visits, 'visit')
              .slice(0, 10)
              .map((item) => (
                // {index === 0 && <p>{item.visit}</p>}
                // {index > 0 && item.visit !== array[index - 1].visit && <p>{item.visit}</p>}
                <CardVisit t={t} visit={item} key={item._id} />
              ))}
          {visits && filteringCustomers.length ? filteringCustomers.map((item) => <CardVisit t={t} visit={item} key={item._id} />) : null}
        </ContainerVisits>
      )}
    </>
  );
};

export default Visits;
