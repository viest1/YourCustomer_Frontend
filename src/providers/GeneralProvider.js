import React, { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTranslation } from 'react-i18next';

export const ListCustomersTestContext = createContext({
  searchingCustomers: [],
  setSearchingCustomers: () => {},
  isSearching: false,
  setIsSearching: () => {},
  themeType: {},
  setThemeType: () => {},
  userData: {},
  setUserData: () => {},
  t: () => {},
});

const GeneralProvider = ({ children }) => {
  const [searchingCustomers, setSearchingCustomers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [themeType, setThemeType] = useLocalStorage('yourCustomerThemeType030122', {
    button: '#222437',
    layout: '#6201ed',
    nav: '#6201ed',
  });
  const [userData, setUserData] = useLocalStorage('userDataListCustomersTest', {
    userId: '',
    token: '',
    name: '',
    email: '',
    exp: '',
    loggedOut: false,
  });
  const { t } = useTranslation();
  return (
    <ListCustomersTestContext.Provider
      value={{
        searchingCustomers,
        setSearchingCustomers,
        isSearching,
        setIsSearching,
        userData,
        setUserData,
        themeType,
        setThemeType,
        t,
      }}
    >
      {children}
    </ListCustomersTestContext.Provider>
  );
};

export default GeneralProvider;
