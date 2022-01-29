import React, { useContext } from 'react';
import Header from '../../organisms/Header/Header';
// import { ReactComponent as WaveBottom } from '../../../assets/images/WavesOpacity.svg';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

const MainContainerApp = ({ children, setThemeState }) => {
  // const { themeType } = useContext(ListCustomersTestContext);
  return (
    <div>
      <Header setThemeState={setThemeState} />
      {children}
      {/*{themeType && (*/}
      {/*  <div className="custom-shape-divider-bottom-1641220290">*/}
      {/*    <WaveBottom />*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default MainContainerApp;
