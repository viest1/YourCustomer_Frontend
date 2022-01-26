import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import CardCustomer from '../../organisms/CardCustomer/CardCustomer';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import { sortByTimestamp } from '../../../helpers/sortByTimestamp';
import { IoIosArrowDown } from 'react-icons/io';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export const ContainerCustomers = styled.div`
  //padding: 2rem;
  //background: ${({ theme }) => theme.color.main100};
  //min-height: 100vh;
  display: flex;
  justify-content: center;
`;

export const ContainerCardsCustomer = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 1300px;
  margin: 0 auto;
  border-radius: 1rem;
`;

export const ContainerFilters = styled.div`
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  p {
    color: white;
  }
`;

export const FilterButton = styled.div`
  padding: 0.6rem 1rem;
  background: #00aaff;
  border: none;
  border-radius: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  transition: all 0.3s;
  width: auto;
  span:hover {
    cursor: pointer;
  }
  span {
    transform: ${({ open }) => (open ? 'rotate(180deg)' : '')};
  }
  p {
    color: white;
    margin: 0;
  }
  &:before {
    display: none;
  }
  ${({ open }) => `
  &:before{
  display:block;
  }
`}
`;

export const ContainerOptionsSort = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 50;
  width: ${({ width }) => (width ? width : '205px')};
  background: #00aaff;
  border-radius: 0.5rem;
  text-align: left;
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    padding: 0;
  }
  li {
    display: block;
    padding: 0.5rem 1rem;
    width: 100%;
    color: white;
  }
  li:hover {
    background: white;
    cursor: pointer;
    border-radius: 0.4rem;
    color: black;
  }
`;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteringCustomers, setFilteringCustomers] = useState([]);
  const [openSortOptions, setOpenSortOptions] = useState(false);
  const [openNumberResultsOptions, setOpenNumberResultsOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { searchingCustomers, isSearching, userData, t } = useContext(ListCustomersTestContext);
  const [numberFilterResults, setNumberFilterResults] = useState(10);
  const {handleLogout} = useAuth()
  const navigate = useNavigate()
  const reducer = (state, action) => {
    let sortedArr = [];
    switch (action.type) {
      case 'Newest Created':
        sortedArr = [...customers]?.sort((a, b) => b.timestamp - a.timestamp).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Oldest Created':
        sortedArr = [...customers]?.sort((a, b) => a.timestamp - b.timestamp).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Most Visits':
        sortedArr = [...customers]?.sort((a, b) => b.visits.length - a.visits.length).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Less Visits':
        sortedArr = [...customers]?.sort((a, b) => a.visits.length - b.visits.length).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Breed A-Z':
        sortedArr = [...customers]?.sort((a, b) => a.breed?.label?.localeCompare(b.breed?.label)).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Breed Z-A':
        sortedArr = [...customers]?.sort((a, b) => b.breed?.label?.localeCompare(a.breed?.label)).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'A-Z':
        sortedArr = [...customers]?.sort((a, b) => a.contactName?.localeCompare(b.contactName)).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Z-A':
        sortedArr = [...customers]?.sort((a, b) => b.contactName?.localeCompare(a.contactName)).slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Last Visit':
        sortedArr = [...customers]
          ?.sort((a, b) => new Date(b.visits[b.visits?.length - 1].visit).getTime() - new Date(a.visits[a.visits?.length - 1].visit).getTime())
          .slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      case 'Oldest Visit':
        sortedArr = [...customers]
          ?.sort((a, b) => new Date(a.visits[a.visits?.length - 1].visit).getTime() - new Date(b.visits[b.visits?.length - 1].visit).getTime())
          .slice(0, numberFilterResults);
        setFilteringCustomers(sortedArr);
        return { ...state, type: action.type };
      default:
        return;
    }
  };
  const [state, dispatch] = useReducer(reducer, { type: 'Newest Created' });
  const fetchCustomers = async () => {
    setIsLoading(true);
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/customers', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
      },
    });
    const resJSON = await res.json();
    if(resJSON.error){
      // userData.loggedOut = true;
      // userData.token = '';
      // navigate('/')
      handleLogout();
      return;
    }
    console.log(resJSON)
    setCustomers(resJSON.allCustomers);
    setIsLoading(false);
  };
  const ref = useRef();
  useOnClickOutside(ref, () => setOpenSortOptions(false));
  const refResults = useRef();
  useOnClickOutside(refResults, () => setOpenNumberResultsOptions(false));

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch({ type: state.type });
  }, [numberFilterResults]);

  // const filterData = [
  //   {
  //     title: 'Sort By',
  //     value: '',
  //     icon: <IoIosArrowDown color={'white'} />,
  //   },
  // ];

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
                <li onClick={() => dispatch({ type: 'Last Visit' })}>Last Visit</li>
                <li onClick={() => dispatch({ type: 'Oldest Visit' })}>Oldest Visit</li>
                <li onClick={() => dispatch({ type: 'Newest Created' })}>Newest Created</li>
                <li onClick={() => dispatch({ type: 'Oldest Created' })}>Oldest Created</li>
                <li onClick={() => dispatch({ type: 'A-Z' })}>A-Z</li>
                <li onClick={() => dispatch({ type: 'Z-A' })}>Z-A</li>
                <li onClick={() => dispatch({ type: 'Most Visits' })}>Most Visits</li>
                <li onClick={() => dispatch({ type: 'Less Visits' })}>Less Visits</li>
                <li onClick={() => dispatch({ type: 'Breed A-Z' })}>Breed A-Z</li>
                <li onClick={() => dispatch({ type: 'Breed Z-A' })}>Breed Z-A</li>
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
      </ContainerFilters>
      {isLoading ? (
        <LoadingSpinner />
      ) : searchingCustomers?.length || isSearching ? (
        <ContainerCardsCustomer>
          {sortByTimestamp(searchingCustomers)?.map((item) => (
            <CardCustomer t={t} customer={item} key={item._id} />
          ))}
        </ContainerCardsCustomer>
      ) : (
        <ContainerCardsCustomer>
          {!filteringCustomers?.length
            ? sortByTimestamp(customers)
                .slice(0, 10)
                .map((item) => <CardCustomer t={t} customer={item} key={item._id} />)
            : filteringCustomers?.map((item) => <CardCustomer t={t} customer={item} key={item._id} />)}
        </ContainerCardsCustomer>
      )}
    </>
  );
};

export default Customers;
