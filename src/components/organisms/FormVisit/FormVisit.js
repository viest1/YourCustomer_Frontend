import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FormLabelAndInput from '../../atoms/FormLabelAndInput/FormLabelAndInput';
import useForm from '../../../hooks/useForm';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { shopProducts } from '../../../data/shop';

export const ContainerFormVisit = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  * {
    color: black;
  }
`;

// export const InputFileStyle = styled.input`
//   padding:2rem;
// `

export const ContainerInputFile = styled.div`
   {
    background: #00bcbe;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    font-size: 1em;
    font-weight: bold;
    margin: 1.25em auto; /*20px/16px 0*/
    padding: 0.875em; /*14px/16px*/
    position: relative;
    text-align: center;
    width: 120px;
  }

  &:hover,
  &:active,
  &:focus {
    background: #00a2a4;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    font-size: 20px;
    opacity: 0;
    filter: alpha(opacity=0);
    width: 148px;
    height: 46px;
    color: #fff;
  }

  //
  //.custom-file-upload {
  //  border: 1px solid #ccc;
  //  display: inline-block;
  //  padding: 6px 12px;
  //  cursor: pointer;
  //}
`;
export const ImgStyled = styled.div`
  display: block;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 2;
  top: -22px;
  left: -120px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const optionsService = [
  { value: 'completeService', label: 'Complete Service' },
  { value: 'handStripping', label: 'Hand Stripping' },
  { value: 'washing', label: 'Washing' },
];

const optionsPremium = [
  { value: '5', label: 'Yes' },
  { value: '0', label: 'No' },
];

const optionsPrice = [
  {
    label: 'Complete Service',
    options: [
      { label: 'Small 60', value: '60' },
      { label: 'Medium 70', value: '70' },
      { label: 'Big 80', value: '80' },
      { label: 'Huge 100', value: '100' },
    ],
  },
  {
    label: 'Hand Stripping',
    options: [
      { label: 'Small 80', value: '80' },
      { label: 'Medium 90', value: '90' },
      { label: 'Big 100', value: '100' },
      { label: 'Huge 120', value: '120' },
    ],
  },
  {
    label: 'Washing',
    options: [
      { label: 'Small 40', value: '40' },
      { label: 'Medium 50', value: '50' },
      { label: 'Big 65', value: '65' },
      { label: 'Huge 85', value: '85' },
    ],
  },
];

const optionsExtraPay = [
  { value: '0', label: 'No' },
  {
    label: 'Tangles',
    options: [
      { label: '5', value: '5' },
      { label: '10', value: '10' },
      { label: '15', value: '15' },
      { label: '20', value: '20' },
    ],
  },
  {
    label: 'Behavior',
    options: [
      { label: '5', value: '5' },
      { label: '10', value: '10' },
      { label: '15', value: '15' },
      { label: '20', value: '20' },
    ],
  },
  {
    label: 'Tangles and Behavior',
    options: [
      { label: '10', value: '10' },
      { label: '15', value: '15' },
      { label: '20', value: '20' },
      { label: '25', value: '25' },
      { label: '30', value: '30' },
    ],
  },
];

const optionsBehavior = [
  { label: '1', value: 'veryAggresive' },
  { label: '2', value: 'notGood' },
  { label: '3', value: 'ok' },
  { label: '4', value: 'kind' },
  { label: '5', value: 'veryKind' },
];

const optionsShop = shopProducts;

const animatedComponents = makeAnimated();

const FormVisit = ({
  setPreviewSource,
  setSubmitted,
  submitted,
  handleSelect,
  handleChange,
  inputs,
  image,
  setImage,
  previewFile,
  previewSource,
}) => {
  const imageRef = useRef(null);
  useEffect(() => {
    if (image) {
      previewFile();
    }
  }, [image]);
  useEffect(() => {
    if (submitted) {
      imageRef.current.value = null;
      setPreviewSource(null);
      setSubmitted(false);
    }
  }, [submitted]);

  return (
    <ContainerFormVisit>
      <FormLabelAndInput
        min="06:00"
        max="24:00"
        type="time"
        id="hour"
        placeholder="Type Here..."
        label="Visit Hour"
        handleInput={handleChange}
        value={inputs.hour || '01:00'}
      />
      <FormLabelAndInput id="visit" type="date" placeholder="Type Here..." label="Visit Date" handleInput={handleChange} value={inputs.visit} />
      <FormLabelAndInput
        min="00:01"
        max="04:00"
        type="time"
        id="time"
        placeholder="Type Here..."
        label="Time Visit"
        handleInput={handleChange}
        value={inputs.time || '00:00'}
      />
      <div>
        <label htmlFor="service">Service</label>
        <Select id="service" name="service" onChange={handleSelect} options={optionsService} value={inputs.service} />
      </div>
      <div>
        <label htmlFor="premium">Premium</label>
        <Select id="premium" name="premium" onChange={handleSelect} options={optionsPremium} value={inputs.premium} />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <Select id="price" name="price" onChange={handleSelect} options={optionsPrice} value={inputs.price} />
      </div>
      <div>
        <label htmlFor="extraPay">Extra Pay</label>
        <Select id="extraPay" name="extraPay" onChange={handleSelect} options={optionsExtraPay} value={inputs.extraPay} />
      </div>
      <div>
        <label htmlFor="behavior">Behavior</label>
        <Select id="behavior" name="behavior" onChange={handleSelect} options={optionsBehavior} value={inputs.behavior} />
      </div>
      <div>
        <label htmlFor="shop">Shop</label>
        <Select
          id="shop"
          name="shop"
          onChange={handleSelect}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={optionsShop}
          value={inputs.shop?.length ? inputs.shop : null}
        />
      </div>
      <ContainerInputFile>
        <input
          type="file"
          ref={imageRef}
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <span>File Upload</span>
        {previewSource && (
          <ImgStyled>
            <img src={previewSource} alt="dog" />
          </ImgStyled>
        )}
      </ContainerInputFile>
      <FormLabelAndInput type='number' id="tip" placeholder="Type Here..." label="Tip" handleInput={handleChange} value={inputs.tip} />
      <FormLabelAndInput textarea id="comments" placeholder="Type Here..." label="Comments" handleInput={handleChange} value={inputs.comments} />
    </ContainerFormVisit>
  );
};

export default FormVisit;
