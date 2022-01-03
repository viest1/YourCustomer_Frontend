import { AiOutlineCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';

export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    maxWidth: '500px',
    height: 'auto',
    minHeight: '200px',
    position: 'relative',
    padding: '2rem',
    background: 'black',
    borderRadius: '1rem',
    textAlign: 'center',
  },
};

export const CloseIcon = styled(AiOutlineCloseCircle)`
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;
