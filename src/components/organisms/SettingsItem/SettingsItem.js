import React from 'react';
import styled from 'styled-components';
import { AiFillEdit } from 'react-icons/ai';
import FormLabelAndInput from '../../atoms/FormLabelAndInput/FormLabelAndInput';

export const ContainerNotInput = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const EditIcon = styled(AiFillEdit)`
  font-size: 22px;
  &:hover {
    transform: scale(1.3);
    cursor: pointer;
  }
`;

const SettingsItem = ({ text, data, element, type, onChange, id, onClick }) => {
  return (
    <div>
      {element === 'input' ? (
        <div>
          <FormLabelAndInput value={data} label={text} type={type} handleInput={onChange} id={id} />
        </div>
      ) : (
        <ContainerNotInput>
          <h2>{text} </h2>
          {data && <p>{data}</p>}
          <EditIcon onClick={onClick} />
        </ContainerNotInput>
      )}
    </div>
  );
};

export default SettingsItem;
