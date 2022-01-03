import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FormLabelAndInput from '../../atoms/FormLabelAndInput/FormLabelAndInput';
import Select from 'react-select';

export const ContainerFormData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  * {
    color: black;
  }
`;

const options = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'big', label: 'Big' },
  { value: 'huge', label: 'Huge' },
];
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
  }, []);

  return (
    <ContainerFormData>
      <FormLabelAndInput
        id="dogOwner"
        placeholder="Type Here..."
        label="Dog Owner"
        required={false}
        handleInput={handleChange}
        value={inputs.dogOwner}
      />
      <FormLabelAndInput
        id="dogName"
        placeholder="Type Here..."
        label="Dog Name"
        required={false}
        handleInput={handleChange}
        value={inputs.dogName}
      />
      <FormLabelAndInput
        id="contactName"
        placeholder="Type Here..."
        label="Contact Name *"
        handleInput={handleChange}
        value={inputs.contactName}
      />
      <FormLabelAndInput id="phone" placeholder="Type Here..." label="Phone" required={false} handleInput={handleChange} value={inputs.phone} />
      <FormLabelAndInput id="address" placeholder="Type Here..." label="Address" required={false} handleInput={handleChange} value={inputs.address} />
      <FormLabelAndInput
        id="birthday"
        type="date"
        placeholder="Type Here..."
        label="Birthday"
        required={false}
        handleInput={handleChange}
        value={inputs.birthday}
      />
      <label htmlFor="gender">Gender</label>
      <Select id="gender" name="gender" onChange={handleSelect} options={gender} value={inputs.gender} />
      {/*<label htmlFor="size">Size</label>*/}
      {/*<Select id="size" name="size" onChange={handleSelect} options={options} value={inputs.size} />*/}
      <label htmlFor="breed">Breed</label>
      <Select id="breed" name="breed" onChange={handleSelect} options={breeds} value={inputs.breed} />
    </ContainerFormData>
  );
};

export default FormData;
