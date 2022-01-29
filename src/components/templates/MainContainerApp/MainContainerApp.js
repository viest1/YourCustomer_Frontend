import React from 'react';
import Header from '../../organisms/Header/Header';

const MainContainerApp = ({ children, setThemeState }) => {
  return (
    <div>
      <Header setThemeState={setThemeState} />
      {children}
    </div>
  );
};

export default MainContainerApp;
