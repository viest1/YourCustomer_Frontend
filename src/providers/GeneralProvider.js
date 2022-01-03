import React, { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ListCustomersTestContext = createContext({
  searchingCustomers: [],
  setSearchingCustomers: () => {},
  isSearching: false,
  setIsSearching: () => {},
  themeType: false,
  setThemeType: () => {},
  userData: {},
  setUserData: () => {},
});

const GeneralProvider = ({ children }) => {
  const [searchingCustomers, setSearchingCustomers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [themeType, setThemeType] = useLocalStorage('yourCustomerThemeType030122', false);
  const [userData, setUserData] = useLocalStorage('userDataListCustomersTest', {
    userId: '',
    token: '',
    name: '',
    email: '',
    exp: 9999999999999,
  });
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
      }}
    >
      {children}
    </ListCustomersTestContext.Provider>
  );
};

export default GeneralProvider;
