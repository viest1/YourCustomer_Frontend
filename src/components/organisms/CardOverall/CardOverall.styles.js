import styled from 'styled-components';
export const ContainerCardMonth = styled.div`
  padding: 2rem;
  margin: 0 auto;
`;

export const ContainerListItemsShop = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ContainerOnMobile = styled.div`
  display: flex;
`;
export const ContainerStatisticsCardsOverall = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  gap: 1rem;
  border-radius: 1rem;
`;

export const Grid1 = styled.div`
  * {
    margin: 0;
    padding: 0;
    color: white;
  }
  div > * {
    margin: 0;
    padding: 0;
  }
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  padding: 1rem;
  gap: 2rem;
  div {
    padding: 1.2rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  h3 {
    font-size: 14px;
  }
  h4 {
    font-size: 30px;
  }
`;

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  height:800px;
  div{
    width:96%;
    display:inline-block;
    position:relative;
  }
`;
