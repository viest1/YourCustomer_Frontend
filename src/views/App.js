import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import GeneralProvider, { ListCustomersTestContext } from 'providers/GeneralProvider';
import { GlobalStyle } from '../assets/styles/GlobalStyle';
import { darkTheme, theme } from '../assets/styles/theme';
import { settingsDarkMode } from '../hooks/useDarkMode';
import MainContent from '../components/templates/MainContent/MainContent';
import MainContainerApp from '../components/templates/MainContainerApp/MainContainerApp';
import PageNotFound404 from '../components/templates/PageNotFound404/PageNotFound404';
import AddCustomer from '../components/templates/AddCustomer/AddCustomer';
import Customers from '../components/templates/Customers/Customers';
import Visits from '../components/templates/Visits/Visits';
import VisitDetails from '../components/organisms/VisitDetails/VisitDetails';
import CustomerDetails from '../components/organisms/CustomerDetails/CustomerDetails';
import EditVisitDetails from '../components/organisms/EditVisitDetails/EditVisitDetails';
import EditCustomerDetails from '../components/organisms/EditCustomerDetails/EditCustomerDetails';
import Statistics from '../components/templates/Statistics/Statistics';
import FormAuth from '../components/organisms/FormAuth/FormAuth';
import AddNewVisit from '../components/organisms/AddNewVisit/AddNewVisit';
import Settings from '../components/templates/Settings/Settings';

function App() {
  const [themeState, setThemeState] = useState('light');
  useEffect(() => settingsDarkMode(setThemeState), []);
  const { userData } = useContext(ListCustomersTestContext);
  return (
    <Router>
      <ThemeProvider theme={themeState === 'light' ? theme : darkTheme}>
        <GlobalStyle />
        <MainContainerApp setThemeState={setThemeState}>
          <Routes>
            {userData.token ? (
              <>
                <Route path="/" element={<MainContent />} />
                <Route path="/add" element={<AddCustomer />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/:id" element={<CustomerDetails />} />
                <Route path="/customers/:id/edit" element={<EditCustomerDetails />} />
                <Route path="/customers/:id/addVisit" element={<AddNewVisit />} />
                <Route path="/visits" element={<Visits />} />
                <Route path="/visits/:id" element={<VisitDetails />} />
                <Route path="/visits/:id/edit" element={<EditVisitDetails />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<PageNotFound404 />} />
              </>
            ) : (
              <>
                <Route path="/" element={<MainContent />} />
                <Route path="/login" element={<FormAuth />} />
              </>
            )}
          </Routes>
        </MainContainerApp>
      </ThemeProvider>
    </Router>
  );
}

export default App;
