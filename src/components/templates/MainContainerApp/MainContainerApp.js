import React from 'react';
import Header from '../../organisms/Header/Header';
import { ReactComponent as WaveBottom } from '../../../assets/images/WavesOpacity.svg';

const MainContainerApp = ({ children, setThemeState }) => {
  return (
    <div>
      <Header setThemeState={setThemeState} />
      {children}
      <div className="custom-shape-divider-bottom-1641220290">
        <WaveBottom />
      </div>
    </div>
  );
};

export default MainContainerApp;
