import React, { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ListCustomersTestContext = createContext({
  searchingCustomers: [],
  setSearchingCustomers: () => {},
  isSearching: false,
  setIsSearching: () => {},
  userData: {},
  setUserData: () => {},
});

const GeneralProvider = ({ children }) => {
  const [searchingCustomers, setSearchingCustomers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [userData, setUserData] = useLocalStorage('userDataListCustomersTest', {
    userId: '',
    token: '',
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
      }}
    >
      {children}
    </ListCustomersTestContext.Provider>
  );
};

export default GeneralProvider;
