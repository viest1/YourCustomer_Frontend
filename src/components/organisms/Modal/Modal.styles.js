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
    background: '#6201ed',
    borderRadius: '1rem',
    textAlign: 'center',
    color: 'white',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
  },
};

export const CloseIcon = styled(AiOutlineCloseCircle)`
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 20px;
  color: white;
  * {
    color: white;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;
