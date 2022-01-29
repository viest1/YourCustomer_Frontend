import styled from 'styled-components';

export const InputSearch = styled.input`
  outline: ${({ isNotValid }) => (isNotValid ? '1px dashed red !important' : 'none')};
  background-color: ${({ theme }) => (theme.color.lighterBackground ? theme.color.black : theme.color.white)};
  border-radius: 8px;
  padding: ${({ padding }) => (padding ? padding : '0.7rem')};
  display: block;
  width: 100%;
  border: 1px solid hsl(0, 0%, 80%);
  color: black !important;
  * {
    color: black !important;
  }

  &:focus {
    outline: 2px solid #2684ff;
  }
`;

export const TextareaStyled = styled.textarea`
  border: 1px solid hsl(0, 0%, 80%);
  outline: ${({ isNotValid }) => (isNotValid ? '1px dashed red !important' : 'none')};
  background-color: ${({ theme }) => (theme.color.lighterBackground ? theme.color.black : theme.color.white)};
  border-radius: 0.7rem;
  padding: 0.7rem;
  display: block;
  width: 100%;
  resize: none;
`;

export const LabelStyled = styled.label`
  display: block;
  //margin:0 0 8px 0;
`;

export const Container = styled.div`
  ${({ is2Columns }) =>
    is2Columns &&
    `display:flex;
gap:1rem;
align-items:center;
width:200px;
justify-content:space-between;
`}
`;

export const ContainerIcon = styled.span`
  position: absolute;
  top: 54%;
  left: 1rem;
  transform: translateY(-50%);
  pointer-events: none;
  svg {
    fill: ${({ themeType }) => themeType.layout};
  }
`;
