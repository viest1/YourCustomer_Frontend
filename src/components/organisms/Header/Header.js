import React, { useContext, useEffect, useRef, useState } from 'react';
import DarkMode from '../../molecules/DarkMode/DarkMode';
import NavLinkItem from '../../molecules/NavLinkItem/NavLinkItem';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { BsGlobe } from 'react-icons/bs';
import FormLabelAndInput from '../../atoms/FormLabelAndInput/FormLabelAndInput';
import { CSSTransition } from 'react-transition-group';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { useAuth } from '../../../hooks/useAuth';
import useModal from '../Modal/useModal';
import Modal from '../Modal/Modal';
import i18next from 'i18next';
import { MdClear } from 'react-icons/md';
import Logo from '../../atoms/Logo/Logo';

export const ContainerHeader = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.color.white};
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: flex-end;
  font-size: ${({ theme }) => theme.fontSize.m};
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 9999;
  @media (max-width: 1289px) {
    gap: 1rem;
    justify-content: space-between;
  }
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
    background: ${({ themeType }) => themeType.nav};
    color: white;
    box-shadow: ${({ theme }) => theme.boxShadow.inside};
  }

  a::after {
    content: '';
    display: block;
    width: 2px;
    height: 40px;
    background: ${({ theme }) => theme.color.main400};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -16px;
    border-radius: 2rem;
    pointer-events: none;
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

export const LanguageIcon = styled(BsGlobe)`
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

export const ContainerHamburger = styled.div`
  position: relative;
  z-index: 2;
  @media (max-width: 353px) {
    display: ${({ hide }) => (hide ? 'none' : 'block')};
  }
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
    background: ${({ theme }) => theme.color.main400};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -1rem;
    border-radius: 2rem;
    pointer-events: none;
  }
`;

export const ContainerListLanguages = styled.div`
  position: absolute;
  top: 70px;
  right: 0;
  z-index: 50;
  width: ${({ width }) => (width ? width : '155px')};
  background: ${({ themeType }) => themeType.button};
  border-radius: 0.2rem;
  text-align: left;
  * {
    color: black;
  }
`;

export const ButtonLanguage = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  border: none;
  outline: none;
  padding: 0.7rem 1.5rem 0.7rem 1.5rem;
  background: ${({ themeType }) => themeType.button};
  border-radius: 0.2rem;
  * {
    color: white;
  }
  &:hover {
    background: #00aaff;
    cursor: pointer;
  }
`;

export const ContainerLogo = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 22px;
  pointer-events: none;
`;

const languages = [
  {
    code: 'de',
    name: 'Deutsch',
    country_code: 'de',
  },
  {
    code: 'en',
    name: 'English',
    country_code: 'gb',
  },
  {
    code: 'pl',
    name: 'Polish',
    country_code: 'pl',
  },
];

const Header = ({ setThemeState }) => {
  const [isOpenSearch, setIsOpenSearch] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [remainingTime, setRemainingTime] = useState();
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [languageMenuIsOpen, setLanguageMenuIsOpen] = useState(false);
  const searchInput = useRef(null);
  const { setSearchingCustomers, isSearching, setIsSearching, userData, setUserData, themeType, t } = useContext(ListCustomersTestContext);
  const { handleLogout } = useAuth();
  const { modalIsOpen, openModal, closeModal } = useModal();
  const size = useWindowSize();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const ref = useRef();
  const languageMenuRef = useRef();
  useOnClickOutside(ref, () => setIsOpenMenu(false));
  useOnClickOutside(languageMenuRef, () => setLanguageMenuIsOpen(false));
  const fetchData = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + userData.userId + '/customers', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
      },
    });
    const resJSON = await res.json();
    setCustomers(resJSON.allCustomers);
  };

  useEffect(() => {
    if (userData.token) {
      fetchData();
    } else {
      setSearchText('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.token]);

  const handleInputSearch = (e) => {
    setSearchText(e.target.value);
    navigate('/customers');
  };

  useEffect(() => {
    if (searchText.length > 0) {
      setIsSearching(true);
      const afterSearching = customers?.filter(
        (item) =>
          item.contactName?.replace(/\s/g, '').toLowerCase().includes(searchText.replace(/\s/g, '').toLowerCase()) ||
          item.dogOwner?.replace(/\s/g, '').toLowerCase().includes(searchText.replace(/\s/g, '').toLowerCase()) ||
          item.dogName?.replace(/\s/g, '').toLowerCase().includes(searchText.replace(/\s/g, '').toLowerCase()) ||
          item.comments?.replace(/\s/g, '').toLowerCase().includes(searchText.replace(/\s/g, '').toLowerCase())
      );
      setSearchingCustomers(afterSearching);
    } else {
      setIsSearching(false);
      setSearchingCustomers([]);
    }
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
    if (size.width < 1290) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [size.width]);

  useEffect(() => {
    let interval;
    if (Date.now() > userData.exp) {
      navigate('/');
      setUserData({
        userId: '',
        token: '',
        name: '',
        exp: '',
      });
    }
    if (userData.token) {
      interval = setInterval(() => {
        if (userData.exp - Date.now() < 30000 && !modalDisplayed) {
          openModal();
          setModalDisplayed(true);
          clearInterval(interval);
        }
        if (Date.now() > userData.exp) {
          navigate('/login');
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
    if (modalDisplayed) {
      interval = setInterval(() => {
        if (Date.now() > userData.exp) {
          navigate('/login');
          setUserData({
            userId: '',
            token: '',
            name: '',
            exp: '',
          });
          setModalDisplayed(false);
        }
      }, 5000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalDisplayed]);

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

  const handleOpenMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };
  const handleCloseMenuBar = () => {
    setIsOpenMenu(false);
  };
  const handleLogoutWithClose = () => {
    setIsOpenMenu(false);
    handleLogout();
  };
  const handleClearSearchInput = () => {
    setSearchText('');
    // setIsOpenSearch(false);
  };

  return (
    <ContainerHeader themeType={themeType}>
      {modalIsOpen && (
        <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
          {Date.now() < userData.exp ? (
            <div>
              <h2 style={{ textAlign: 'center', color: 'white' }}>{t('modal.areYouThere')}</h2>
              <p style={{ color: 'white' }}>{t('modal.willLogout')}</p>
              <p style={{ textAlign: 'center', color: 'white' }}>
                {t('modal.automaticallyLogout')}: {remainingTime}
              </p>
            </div>
          ) : (
            <div>
              <h2 style={{ textAlign: 'center', color: 'white' }}>{t('modal.sessionExp')}</h2>
              <h2 style={{ textAlign: 'center', color: 'white' }}>{t('modal.loggedOut')}</h2>
            </div>
          )}
        </Modal>
      )}
      {!isMobile ? (
        <>
          <ContainerLogo>
            <Logo />
          </ContainerLogo>
          <NavLinkItem text="Home" path="/" />
          {userData.token && (
            <>
              <NavLinkItem text={t('navigation.addCustomer')} path="/add" />
              <NavLinkItem text={t('navigation.customers')} path="/customers" />
              <NavLinkItem text={t('navigation.visits')} path="/visits" />
              <NavLinkItem text={t('navigation.statistics')} path="/statistics" />
              <NavLinkItem text={t('navigation.settings')} path="/settings" />
              <NavLinkItem text={t('navigation.logout')} path="/login" onClick={handleLogoutWithClose} />
            </>
          )}
          {!userData.token && <NavLinkItem text={t('login.l')} path="/login" />}
        </>
      ) : (
        <div ref={ref}>
          <ContainerHamburger hide={isOpenSearch}>
            <div className={isOpenMenu ? 'icon nav-icon-1 open' : 'icon nav-icon-1'} onClick={handleOpenMenu}>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </ContainerHamburger>
          <ContainerListMenu open={isOpenMenu}>
            <ListMenu>
              <NavLinkItem text="Home" path="/" onClick={handleCloseMenuBar} />
              {userData.token && (
                <>
                  <NavLinkItem text={t('navigation.addCustomer')} path="/add" onClick={handleCloseMenuBar} />
                  <NavLinkItem text={t('navigation.customers')} path="/customers" onClick={handleCloseMenuBar} />
                  <NavLinkItem text={t('navigation.visits')} path="/visits" onClick={handleCloseMenuBar} />
                  <NavLinkItem text={t('navigation.statistics')} path="/statistics" onClick={handleCloseMenuBar} />
                  <NavLinkItem text={t('navigation.settings')} path="/settings" onClick={handleCloseMenuBar} />
                  <NavLinkItem text={t('navigation.logout')} path="/login" onClick={handleLogoutWithClose} />
                </>
              )}
              {!userData.token && <NavLinkItem text={t('login.l')} path="/login" onClick={handleCloseMenuBar} />}
            </ListMenu>
          </ContainerListMenu>
        </div>
      )}
      {userData.token && (
        <CSSTransition in={isOpenSearch} timeout={300} classNames="search-input" unmountOnExit>
          <FormLabelAndInput
            ref={searchInput}
            placeholder="Search..."
            value={searchText}
            handleInput={handleInputSearch}
            // onBlur={() => searchText.length < 1 && setIsOpenSearch(false)}
            rightIcon={<MdClear />}
            noPointer
            fnToClick={handleClearSearchInput}
            padding={'0.7rem 0 0.7rem 1rem'}
            width={size.width > 1290 && size.width < 1400 ? '150px' : '100%'}
          />
        </CSSTransition>
      )}
      <ContainerIcons>
        {userData.token && <SearchIcon onClick={handleOpenSearchBar} />}
        <span ref={languageMenuRef} style={{ display: 'flex', alignItems: 'center' }}>
          <CSSTransition in={languageMenuIsOpen} timeout={300} classNames="search-input" unmountOnExit>
            <ContainerListLanguages themeType={themeType}>
              {languageMenuIsOpen &&
                languages.map((item, index) => (
                  <ButtonLanguage
                    themeType={themeType}
                    key={index}
                    onClick={() => {
                      i18next.changeLanguage(item.code);
                      setLanguageMenuIsOpen(false);
                    }}
                  >
                    <span className={`fi fi-${item.country_code}`} />
                    <span>{item.name}</span>
                  </ButtonLanguage>
                ))}
            </ContainerListLanguages>
          </CSSTransition>
          <LanguageIcon onClick={() => setLanguageMenuIsOpen((prev) => !prev)} />
        </span>
        <DarkMode setThemeState={setThemeState} />
      </ContainerIcons>
    </ContainerHeader>
  );
};

export default Header;
