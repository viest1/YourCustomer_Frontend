import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import CardCustomer from '../../organisms/CardCustomer/CardCustomer';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import { sortByTimestamp } from '../../../helpers/sortByTimestamp';
import { IoIosArrowDown } from 'react-icons/io';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { useAuth } from '../../../hooks/useAuth';
import { useInView } from 'react-intersection-observer';
import { ContainerWithBackground, ContainerFilters, ContainerCardsCustomer, ContainerOptionsSort, FilterButton } from './Customers.styles';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteringCustomers, setFilteringCustomers] = useState([]);
  const [openSortOptions, setOpenSortOptions] = useState(false);
  const [openNumberResultsOptions, setOpenNumberResultsOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { searchingCustomers, isSearching, userData, t, themeType } = useContext(ListCustomersTestContext);
  const [numberFilterResults, setNumberFilterResults] = useState(10);
  const { handleLogout } = useAuth();
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
    if (resJSON.error) {
      // userData.loggedOut = true;
      // userData.token = '';
      // navigate('/')
      handleLogout();
      return;
    }
    setCustomers(resJSON.allCustomers);
    dispatch({ type: 'Newest Created' });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberFilterResults]);

  const { ref: lastRef, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) setNumberFilterResults((prev) => prev + 10);
  }, [inView]);

  return (
    <>
      <ContainerWithBackground themeType={themeType}>
        <ContainerFilters>
          <FilterButton themeType={themeType} ref={ref} open={openSortOptions}>
            <p>Sort By {state.type}</p>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <IoIosArrowDown fill={'white'} onClick={() => setOpenSortOptions((prev) => !prev)} />
            </span>
            {openSortOptions && (
              <ContainerOptionsSort themeType={themeType}>
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
          <FilterButton ref={refResults} themeType={themeType} open={openNumberResultsOptions}>
            <p>Results {numberFilterResults}</p>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <IoIosArrowDown fill={'white'} onClick={() => setOpenNumberResultsOptions((prev) => !prev)} />
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
        </ContainerFilters>
      </ContainerWithBackground>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
          <LoadingSpinner />
        </div>
      ) : searchingCustomers?.length || isSearching ? (
        <ContainerCardsCustomer>
          {sortByTimestamp(searchingCustomers)?.map((item) => (
            <CardCustomer t={t} customer={item} key={item._id} />
          ))}
        </ContainerCardsCustomer>
      ) : (
        <ContainerCardsCustomer>
          {filteringCustomers
            ? filteringCustomers?.map((item, i) => (
                <CardCustomer ref={filteringCustomers.length === i + 1 ? lastRef : null} t={t} customer={item} key={item._id} />
              ))
            : 'Something Wrong'}
        </ContainerCardsCustomer>
      )}
    </>
  );
};

export default Customers;
