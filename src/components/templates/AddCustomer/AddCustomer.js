import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import FormVisit from '../../organisms/FormVisit/FormVisit';
import useForm from '../../../hooks/useForm';
import FormData from '../../organisms/FormData/FormData';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import Button from '../../atoms/Button/Button';
import useModal from '../../organisms/Modal/useModal';
import Modal from '../../organisms/Modal/Modal';
import { ContainerLoadingSpinner } from '../../../assets/styles/GlobalStyle';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

const initialValues = {
  dogOwner: '',
  dogName: '',
  contactName: '',
  phone: '',
  address: '',
  birthday: '',
  gender: '',
  size: '',
  breed: '',
  service: '',
  visit: '',
  price: '',
  premium: '',
  tip: '0',
  behavior: '',
  extraPay: '',
  time: '',
  hour: '',
  comments: '',
  shop: [],
};
// {label:"", value:""}

export const ContainerForm = styled.form`
  width: 100%;
  max-width: 700px;
  margin: 2rem auto 2rem auto;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.boxShadow.inside};
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  gap: 1rem;
  transition: 0.4s;
  @media all and (max-width: 500px) {
    padding: 1rem;
  }
  @media all and (min-width: 1300px) {
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 1200px;
    justify-content: center;
    padding: 4rem;
    fieldset {
      width: 48%;
    }

    button {
      width: 1050px;
    }
  }
  position: relative;

  fieldset {
    padding: 1.5rem;
    border-radius: 1rem;
  }
`;

const AddCustomer = () => {
  const { inputs, resetForm, handleChange, handleSelect } = useForm(initialValues);
  const [image, setImage] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState();
  const { modalIsOpen, openModal, closeModal } = useModal();
  const { userData } = useContext(ListCustomersTestContext);

  const previewFile = () => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      inputs.image = reader.result;
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.premium || !inputs.price || !inputs.extraPay || !inputs.behavior) {
      setValidationError(`You need to select in Form:
      ${!inputs.premium && 'Premium'},
      ${!inputs.price && 'Price'},
      ${!inputs.extraPay && 'Extra Pay'},
      ${!inputs.behavior && 'Behavior'}`);
      return;
    }

    setIsLoading(true);
    inputs.timestamp = Date.now();
    inputs.addedDate = new Date().toISOString().slice(0, 10);
    inputs.userId = userData.userId;
    await fetch(process.env.REACT_APP_BACKEND_URL + '/customers/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      },
      body: JSON.stringify(inputs),
    });
    resetForm();
    setSubmitted(true);
    setIsLoading(false);
    openModal();
  };

  useEffect(() => {
    setValidationError();
  }, [inputs]);

  return (
    <ContainerForm onSubmit={handleSubmit}>
      <fieldset disabled={isLoading}>
        <legend>Customer Data</legend>
        <FormData inputs={inputs} handleChange={handleChange} handleSelect={handleSelect} />
      </fieldset>
      <fieldset disabled={isLoading}>
        <legend>Visit Information</legend>
        <FormVisit
          previewSource={previewSource}
          previewFile={previewFile}
          inputs={inputs}
          handleChange={handleChange}
          handleSelect={handleSelect}
          image={image}
          setImage={setImage}
          submitted={submitted}
          setSubmitted={setSubmitted}
          setPreviewSource={setPreviewSource}
        />
        {isLoading && (
          <ContainerLoadingSpinner>
            <LoadingSpinner asOverlay />
          </ContainerLoadingSpinner>
        )}
      </fieldset>
      <Button type="submit" text="Add New Customer" />
      {validationError && <p>{validationError}</p>}
      {modalIsOpen && (
        <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
          <h2>You added Customer correctly!</h2>
          <p>Well Done!</p>
        </Modal>
      )}
    </ContainerForm>
  );
};

export default AddCustomer;
