import styled from 'styled-components';

export const ContainerCardsCustomer = styled.div`
  padding: 0.3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  max-width: 95%;
  margin: 1.2rem auto 0 auto;
  border-radius: 1rem;
  @media (max-width: 535px) {
    grid-template-columns: repeat(auto-fit, minmax(230px, 400px));
    justify-content: center;
  }
  @media (min-width: 1700px) {
    max-width: 1660px;
  }
`;

export const ContainerFilters = styled.div`
  padding: 1rem 0.3rem;
  max-width: 95%;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  p {
    color: white;
  }
  @media (min-width: 1700px) {
    max-width: 1660px;
  }
`;

export const ContainerWithBackground = styled.div`
  background: ${({ theme }) => theme.color.white100};
  box-shadow: 0 4px 6px ${({ themeType }) => themeType.layout};
  width: 100%;
  transition: all 0.6s;
`;

export const FilterButton = styled.div`
  padding: 0.6rem 1rem;
  background: #00aaff;
  background: ${({ themeType }) => themeType.button};
  border: none;
  border-radius: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  transition: all 0.3s;
  width: auto;
  font-size: 12px;
  span:hover {
    cursor: pointer;
  }
  span {
    transform: ${({ open }) => (open ? 'rotate(180deg)' : '')};
  }
  p {
    color: white;
    margin: 0;
  }
  &:before {
    display: none;
  }
  ${({ open }) => `
  &:before{
  display:block;
  }
`}
`;

export const ContainerOptionsSort = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 50;
  width: ${({ width }) => (width ? width : '205px')};
  background: ${({ themeType }) => themeType.button};
  border-radius: 0.5rem;
  text-align: left;
  box-shadow: 0 0 15px 2px black;
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    padding: 0;
  }
  li {
    display: block;
    padding: 0.5rem 1rem;
    width: 100%;
    color: white;
  }
  li:hover {
    background: white;
    cursor: pointer;
    border-radius: 0.4rem;
    color: black;
  }
`;
