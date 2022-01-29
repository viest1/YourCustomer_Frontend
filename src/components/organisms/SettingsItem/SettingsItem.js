import React from 'react';
import styled from 'styled-components';
import { AiFillEdit } from 'react-icons/ai';
import FormLabelAndInput from '../../atoms/FormLabelAndInput/FormLabelAndInput';

export const ContainerNotInput = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  svg:hover{
    cursor:pointer;
    transform: scale(1.3);
  }
`;

export const EditIcon = styled(AiFillEdit)`
  font-size: 22px;
  &:hover {
    transform: scale(1.3);
    cursor: pointer;
  }
`;

const SettingsItem = ({ text, data, element, type, onChange, id, onClick, icon = <EditIcon onClick={onClick} /> }) => {
  return (
    <div>
      {element === 'input' ? (
        <div>
          <FormLabelAndInput value={data} label={text} type={type} handleInput={onChange} id={id} />
        </div>
      ) : (
        <ContainerNotInput>
          <p>{text} </p>
          {data && <p>{data}</p>}
          {icon}
        </ContainerNotInput>
      )}
    </div>
  );
};

export default SettingsItem;
