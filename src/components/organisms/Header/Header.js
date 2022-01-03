import React, { useContext, useEffect, useRef, useState } from 'react';
import DarkMode from '../../molecules/DarkMode/DarkMode';
import NavLinkItem from '../../molecules/NavLinkItem/NavLinkItem';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import FormLabelAndInput from '../../atoms/FormLabelAndInput/FormLabelAndInput';
import { CSSTransition } from 'react-transition-group';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import Button from '../../atoms/Button/Button';
import { useAuth } from '../../../hooks/useAuth';
import useModal from '../Modal/useModal';
import Modal from '../Modal/Modal';

export const ContainerHeader = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.color.white};
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: flex-end;
  font-size: ${({ theme }) => theme.fontSize.m};
  box-shadow: ${({ theme }) => theme.boxShadow.inside};

  * {
    transition: 0.3s;
  }

  a {
    text-decoration: none;
    padding: 1rem;
    border-radius: 1rem;
    transition: 0.3s;
    position: relative;
  }

  a:hover {
    background: ${({ theme }) => theme.color.main100};
    box-shadow: ${({ theme }) => theme.boxShadow.inside};
  }

  a::after {
    content: '';
    display: block;
    width: 2px;
    height: 40px;
    background: green;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -16px;
    border-radius: 2rem;
  }
`;

export const ContainerIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SearchIcon = styled(FaSearch)`
  font-size: 22px;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }

  &:focus {
    border-radius: 1rem;
    -moz-outline-radius: 1rem;
  }
`;

export const Title = styled.h2`
  position: absolute;
  top: 15px;
  left: 22px;
`;

export const ContainerHamburger = styled.div`
  margin-right: auto;
  position: relative;
  z-index: 2;
`;

export const ContainerListMenu = styled.div`
  padding: 2rem;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: absolute;
  background: ${({ theme }) => theme.color.white};
  top: 0;
  left: 0;
  transform: ${({ open }) => (open ? `translateX(0px)` : 'translateX(-100px)')};
  z-index: 1;
  border-radius: 1rem;
  border: 1px solid black;
`;

export const ListMenu = styled.div`
  padding: 1rem 0 3rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;
  position: relative;
  top: 50px;
  left: -40px;

  a {
    margin-left: 0.5rem;
  }

  a::after {
    content: '';
    display: block;
    width: 2px;
    height: 30px;
    background: green;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -1rem;
    border-radius: 2rem;
  }
`;

const Header = ({ setThemeState }) => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [remainingTime, setRemainingTime] = useState();
  const searchInput = useRef(null);
  const { setSearchingCustomers, isSearching, setIsSearching, userData, setUserData } = useContext(ListCustomersTestContext);
  const { handleLogout } = useAuth();
  const { modalIsOpen, openModal, closeModal } = useModal();
  const size = useWindowSize();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpenMenu(false));
  const fetchData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/customers');
    const resJSON = await res.json();
    setCustomers(resJSON.allCustomers);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText.length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
    const afterSearching = customers?.filter((item) => item.contactName.toLowerCase().includes(searchText.toLowerCase()));
    setSearchingCustomers(afterSearching);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    if (isSearching) {
      navigate('/customers');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearching]);

  const handleOpenSearchBar = () => {
    setIsOpenSearch((prev) => !prev);
  };

  useEffect(() => {
    if (searchInput.current && isOpenSearch) {
      searchInput.current.focus();
    }
  }, [isOpenSearch]);

  useEffect(() => {
    if (size.width < 945) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [size.width]);

  useEffect(() => {
    let interval;
    if (Date.now() > userData.exp) {
      setUserData({
        userId: '',
        token: '',
        name: '',
        exp: '',
      });
    }
    if (userData.token) {
      interval = setInterval(() => {
        if (userData.exp - Date.now() < 30000) {
          openModal();
        }
        if (Date.now() > userData.exp) {
          setUserData({
            userId: '',
            token: '',
            name: '',
            exp: '',
          });
        }
      }, 5000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.exp]);

  useEffect(() => {
    let interval;
    if (modalIsOpen) {
      interval = setInterval(() => {
        setRemainingTime(((userData.exp - Date.now()) / 1000).toFixed(1));
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);

  const handleLogoutTime = () => {
    closeModal();
    setUserData({ ...userData, exp: userData.exp + 1000 * 35 });
  };

  return (
    <ContainerHeader>
      {modalIsOpen && (
        <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
          {Date.now() < userData.exp ? (
            <div>
              <h2 style={{ textAlign: 'center' }}>Are You There?</h2>
              <Button text="If You Are Here, Click Here to Stay Logged In" onClick={handleLogoutTime} />
              <p style={{ textAlign: 'center' }}>Time to Automatically Logout: {remainingTime}</p>
            </div>
          ) : (
            <div>
              <h2 style={{ textAlign: 'center' }}>Your Session Expired!</h2>
              <h2 style={{ textAlign: 'center' }}>You Logged Out!</h2>
            </div>
          )}
        </Modal>
      )}
      {!isMobile ? (
        <>
          <Title>YourCustomer</Title>
          <NavLinkItem text="Home" path="/" />
          {userData.token && (
            <>
              <NavLinkItem text="Add Customer" path="/add" />
              <NavLinkItem text="Customers" path="/customers" />
              <NavLinkItem text="Visits" path="/visits" />
              <NavLinkItem text="Statistics" path="/statistics" />
              <NavLinkItem text="Settings" path="/settings" />
              <NavLinkItem text="Logout" path="/logout" onClick={handleLogout} />
            </>
          )}
          {!userData.token && <NavLinkItem text="Login" path="/login" />}
        </>
      ) : (
        <>
          <ContainerHamburger>
            <div className={isOpenMenu ? 'icon nav-icon-1 open' : 'icon nav-icon-1'} onClick={() => setIsOpenMenu((prev) => !prev)}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </ContainerHamburger>
          <ContainerListMenu open={isOpenMenu} ref={ref}>
            <ListMenu>
              <NavLinkItem text="Home" path="/" />
              {userData.token && (
                <>
                  <NavLinkItem text="Add Customer" path="/add" />
                  <NavLinkItem text="Customers" path="/customers" />
                  <NavLinkItem text="Visits" path="/visits" />
                  <NavLinkItem text="Statistics" path="/statistics" />
                  <NavLinkItem text="Logout" path="/logout" onClick={handleLogout} />
                </>
              )}
              {!userData.token && <NavLinkItem text="Login" path="/login" />}
            </ListMenu>
          </ContainerListMenu>
        </>
      )}
      <CSSTransition in={isOpenSearch} timeout={300} classNames="search-input" unmountOnExit>
        <FormLabelAndInput
          ref={searchInput}
          placeholder="Search..."
          value={searchText}
          handleInput={handleInputSearch}
          onBlur={() => searchText.length < 1 && setIsOpenSearch(false)}
        />
      </CSSTransition>
      <ContainerIcons>
        <SearchIcon onClick={handleOpenSearchBar} />
        <DarkMode setThemeState={setThemeState} />
      </ContainerIcons>
    </ContainerHeader>
  );
};

export default Header;
