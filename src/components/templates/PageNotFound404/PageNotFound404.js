import React from 'react';
import pageNotFound from '../../../assets/illustrations/undraw_page_not_found_re_e9o6.svg';
import styled from 'styled-components';

export const ContainerPageNotFound = styled.main`
  padding: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 600px;
    height: 600px;
  }
`;

const PageNotFound404 = () => {
  return (
    <main style={{ padding: '10rem' }}>
      <img src={pageNotFound} alt="pageNotFound" />
    </main>
  );
};

export default PageNotFound404;
