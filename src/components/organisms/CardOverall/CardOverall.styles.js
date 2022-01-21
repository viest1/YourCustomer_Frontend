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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding: 1rem;
  gap: 2rem;
  @media (max-width:1200px){
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  }
  div {
    padding: 1.2rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  > div {
    box-shadow: 5px 5px 18px 0px rgba(0, 0, 0, 0.15);
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
  //grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin: 1rem;
  @media (min-width: 1200px){
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  }
  div {
    padding: 1rem;
    //background: #222437;
    //background: #6201ed;
    background: white;
    border-radius: 1rem;
  }
  > div {
    box-shadow: 5px 5px 18px 0px rgba(0, 0, 0, 0.15);
  }
  * {
    color: black;
  }
  div > p:first-child {
    font-weight: bold;
  }
  div > p{
    margin-left:1rem;
  }
`;

export const ContainerDoughnut = styled.div`
  height: 250px;
  @media (min-width: 600px) {
    height: 310px;
  }
`;
export const ContainerBar = styled.div`
  height: 250px;
  @media (min-width: 600px) {
    height: 310px;
  }
`;
export const ContainerBarShop = styled.div`
  height:350px;
`
