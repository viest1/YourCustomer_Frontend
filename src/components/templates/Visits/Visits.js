import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import CardVisit from '../../organisms/CardVisit/CardVisit';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import { sortByTimestamp } from '../../../helpers/sortByTimestamp';
import { IoIosArrowDown } from 'react-icons/io';
import { ContainerFilters, ContainerOptionsSort, FilterButton } from '../Customers/Customers';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { FcCheckmark, FcClearFilters } from 'react-icons/fc';
import { CgCloseR } from 'react-icons/cg';
import { RiCloseFill } from 'react-icons/ri';

export const ContainerVisits = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 1rem;
`;

const Visits = () => {
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [withPhoto, setWithPhoto] = useState(false);
  const { userData, t } = useContext(ListCustomersTestContext);
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
        if (action.withPhoto){
          sortedArr = [...visits]?.filter(item => item.photo).sort((a, b) => b.timestamp - a.timestamp).slice(0, numberFilterResults);
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
        return;
    }
  };
  const [state, dispatch] = useReducer(reducer, { type: 'Last Visit' });
  const ref = useRef();
  useOnClickOutside(ref, () => setOpenSortOptions(false));
  const refResults = useRef();
  useOnClickOutside(refResults, () => setOpenNumberResultsOptions(false));
  useEffect(() => {
    dispatch({ type: state.type });
  }, [numberFilterResults]);
  useEffect(() => {
    if (withPhoto) {
      dispatch({ ...state, withPhoto: true });
    } else {
      dispatch({ ...state, withPhoto: false });
    }
  }, [withPhoto]);

  return (
    <>
      <ContainerFilters>
        <FilterButton ref={ref} open={openSortOptions}>
          <p>Sort By {state.type}</p>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <IoIosArrowDown color={'white'} onClick={() => setOpenSortOptions((prev) => !prev)} />
          </span>
          {openSortOptions && (
            <ContainerOptionsSort>
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
        <FilterButton ref={refResults}>
          <p>Results {numberFilterResults}</p>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <IoIosArrowDown color={'white'} onClick={() => setOpenNumberResultsOptions((prev) => !prev)} />
          </span>
          {openNumberResultsOptions && (
            <ContainerOptionsSort width={'120px'}>
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
        <FilterButton>
          <p>With Photo</p>
          <span
            style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '0.6rem' }}
            onClick={() => setWithPhoto((prev) => !prev)}
          >
            {withPhoto ? <FcCheckmark width={18} fontSize={18} /> : <RiCloseFill color="red" fontSize={18} />}
          </span>
        </FilterButton>
      </ContainerFilters>
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
