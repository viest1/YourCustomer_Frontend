import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import FormLabelAndInput from '../../atoms/FormLabelAndInput/FormLabelAndInput';
import Select from 'react-select';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerFormData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  label {
    color: ${({ theme }) => theme.color.black};
  }

  * {
    color: black;
  }
`;

// const options = [
//   { value: 'small', label: 'Small' },
//   { value: 'medium', label: 'Medium' },
//   { value: 'big', label: 'Big' },
//   { value: 'huge', label: 'Huge' },
// ];
const gender = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];
const arr = [];
const getBreedList = async () => {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const json = await res.json();
  arr.length = 0;
  for (const [key, value] of Object.entries(json.message)) {
    if (value.length > 0) {
      for (const el of value) {
        arr.push({ value: `${key} ${el}`, label: `${key} ${el}` });
      }
    } else {
      arr.push({ value: key, label: key });
    }
  }
};

const FormData = ({ handleSelect, handleChange, inputs }) => {
  const { t } = useContext(ListCustomersTestContext);
  const [breeds, setBreeds] = useState([]);
  useEffect(() => {
    getBreedList().then(() => {
      if (!breeds.length) {
        setBreeds(arr);
      }
    });
    return () => {
      setBreeds([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContainerFormData>
      <FormLabelAndInput
        id="dogOwner"
        placeholder="Type Here..."
        label={t('formData.dogOwner')}
        required={false}
        handleInput={handleChange}
        value={inputs.dogOwner}
      />
      <FormLabelAndInput
        id="dogName"
        placeholder="Type Here..."
        label={t('formData.dogName')}
        required={false}
        handleInput={handleChange}
        value={inputs.dogName}
      />
      <FormLabelAndInput
        id="contactName"
        placeholder="Type Here..."
        label={t('formData.contactName')}
        handleInput={handleChange}
        value={inputs.contactName}
      />
      <FormLabelAndInput
        id="phone"
        placeholder="Type Here..."
        label={t('formData.phone')}
        required={false}
        handleInput={handleChange}
        value={inputs.phone}
      />
      <FormLabelAndInput
        id="address"
        placeholder="Type Here..."
        label={t('formData.address')}
        required={false}
        handleInput={handleChange}
        value={inputs.address}
      />
      <FormLabelAndInput
        id="birthday"
        type="date"
        placeholder="Type Here..."
        label={t('formData.birthday')}
        required={false}
        handleInput={handleChange}
        value={inputs.birthday}
      />
      <label htmlFor="gender">{t('formData.gender')}</label>
      <Select id="gender" name="gender" onChange={handleSelect} options={gender} value={inputs.gender} />
      {/*<label htmlFor="size">Size</label>*/}
      {/*<Select id="size" name="size" onChange={handleSelect} options={options} value={inputs.size} />*/}
      <label htmlFor="breed">{t('formData.breed')}</label>
      <Select id="breed" name="breed" onChange={handleSelect} options={breeds} value={inputs.breed} />
    </ContainerFormData>
  );
};

export default FormData;
