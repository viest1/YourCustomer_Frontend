import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FormLabelAndInput from '../../atoms/FormLabelAndInput/FormLabelAndInput';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { shopProducts } from '../../../data/shop';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerFormVisit = styled.div`
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

// const optionsService = [
//   { value: 'completeService', label: 'Complete Service' },
//   { value: 'handStripping', label: 'Hand Stripping' },
//   { value: 'washing', label: 'Washing' },
// ];

const optionsPremium = [
  { value: '0', label: 'No' },
  { value: '5', label: 'Premium' },
  { value: '10', label: 'Bichon' },
  { value: '20', label: 'Toothbrush' },
];

const optionsPrice = [
  {
    label: 'Complete Service',
    options: [
      { label: 'Small 65', value: '65 CompleteService Small' },
      { label: 'Medium 75', value: '75 CompleteService Medium' },
      { label: 'Big 85', value: '85 CompleteService Big' },
      { label: 'Huge 105', value: '105 CompleteService Huge' },
    ],
  },
  {
    label: 'Hand Stripping',
    options: [
      { label: 'Small 85', value: '85 HandStripping Small' },
      { label: 'Medium 95', value: '95 HandStripping Medium' },
      { label: 'Big 105', value: '105 HandStripping Big' },
      { label: 'Huge 125', value: '125 HandStripping Huge' },
    ],
  },
  {
    label: 'Washing',
    options: [
      { label: 'Small 45', value: '45 Washing Small' },
      { label: 'Medium 55', value: '55 Washing Medium' },
      { label: 'Big 70', value: '70 Washing Big' },
      { label: 'Huge 90', value: '90 Washing Huge' },
    ],
  },
  {
    label: 'Welcome Visit',
    options: [
      { label: 'Small 40', value: '40 WelcomeVisit Small' },
      { label: 'Medium 40', value: '40 WelcomeVisit Medium' },
      { label: 'Big 40', value: '40 WelcomeVisit Big' },
      { label: 'Huge 40', value: '40 WelcomeVisit Huge' },
    ],
  },
  {
    label: 'Only Premium',
    options: [
      { label: 'Small 0', value: '0 OnlyPremium Small' },
      { label: 'Medium 0', value: '0 OnlyPremium Medium' },
      { label: 'Big 0', value: '0 OnlyPremium Big' },
      { label: 'Huge 0', value: '0 OnlyPremium Huge' },
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
  editMode,
}) => {
  const imageRef = useRef(null);
  const { t } = useContext(ListCustomersTestContext);
  useEffect(() => {
    if (image) {
      previewFile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);
  useEffect(() => {
    if (submitted) {
      imageRef.current.value = null;
      setPreviewSource(null);
      setSubmitted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  return (
    <ContainerFormVisit>
      <FormLabelAndInput
        id="visit"
        type="date"
        placeholder="Type Here..."
        label={t('formVisit.visit')}
        handleInput={handleChange}
        value={inputs.visit}
      />
      <FormLabelAndInput
        min="06:00"
        max="24:00"
        type="time"
        id="hour"
        placeholder="Type Here..."
        label={t('formVisit.hour')}
        handleInput={handleChange}
        value={inputs.hour || ''}
      />
      <FormLabelAndInput
        min="00:01"
        max="04:00"
        type="time"
        id="time"
        placeholder="Type Here..."
        label={t('formVisit.time')}
        handleInput={handleChange}
        value={inputs.time || ''}
      />
      {/*<div>*/}
      {/*  <label htmlFor="service">Service</label>*/}
      {/*  <Select id="service" name="service" onChange={handleSelect} options={optionsService} value={inputs.service} />*/}
      {/*</div>*/}
      <div>
        <label htmlFor="premium">{t('formVisit.premium')}</label>
        <Select
          id="premium"
          name="premium"
          onChange={handleSelect}
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          isClearable
          options={optionsPremium}
          value={inputs.premium}
        />
      </div>
      <div>
        <label htmlFor="price">{t('formVisit.price')}</label>
        <Select id="price" name="price" onChange={handleSelect} options={optionsPrice} value={inputs.price} />
      </div>
      {editMode && (
        <FormLabelAndInput
          required={false}
          type="number"
          id="correctedPrice"
          placeholder="Correct Price"
          label={t('formVisit.correctPrice')}
          handleInput={handleChange}
          value={inputs.correctedPrice}
        />
      )}
      <div>
        <label htmlFor="extraPay">{t('formVisit.extraPay')}</label>
        <Select id="extraPay" name="extraPay" onChange={handleSelect} options={optionsExtraPay} value={inputs.extraPay} />
      </div>
      <div>
        <label htmlFor="behavior">{t('formVisit.behavior')}</label>
        <Select id="behavior" name="behavior" onChange={handleSelect} options={optionsBehavior} value={inputs.behavior} />
      </div>
      <div>
        <label htmlFor="shop">{t('formVisit.shop')}</label>
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
        <span>{t('formVisit.fileUpload')}</span>
        {previewSource ||
          (inputs.photo && (
            <ImgStyled>
              <img src={previewSource || inputs.photo} alt="dog" />
            </ImgStyled>
          ))}
      </ContainerInputFile>
      <FormLabelAndInput type="number" id="tip" placeholder="Type Here..." label={t('formVisit.tip')} handleInput={handleChange} value={inputs.tip} />
      <FormLabelAndInput
        textarea
        id="comments"
        placeholder="Type Here..."
        label={t('formVisit.comments')}
        handleInput={handleChange}
        value={inputs.comments}
        required={false}
      />
    </ContainerFormVisit>
  );
};

export default FormVisit;
