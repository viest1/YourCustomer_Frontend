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
  contactName: 'S ',
  phone: '',
  address: '',
  birthday: '',
  gender: '',
  size: '',
  breed: '',
  service: '',
  visit: '',
  price: '',
  premium: [{ label: 'No', value: '0' }],
  tip: '',
  behavior: { label: '3', value: 'ok' },
  extraPay: { label: 'No', value: '0' },
  time: '01:45',
  hour: '14:45',
  comments: '',
  generalComment: '',
  shop: [],
};
// {label:"", value:""}

export const ContainerForm = styled.form`
  width: 100%;
  box-shadow: ${({ theme }) => theme.boxShadow.inside};
  background: ${({ theme }) => theme.color.white100};
  overflow-x: hidden;
  transition: all 0.4s;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0.6rem;
  fieldset {
    padding: 1rem;
    border-radius: 0.8rem;
    width: 100%;
    //box-shadow: 4px 4px 2px ${({ theme }) => theme.color.main100};
    box-shadow: 4px 4px 6px ${({ themeType }) => themeType.layout};
  }
  button {
    margin: 2rem auto 1rem auto;
    width: 100%;
    color: white;
  }
  label {
    color: ${({ theme }) => theme.color.black};
  }

  // * {
  //   color: ${({ theme }) => theme.color.black};
  // }
`;

export const ContainerForms = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 600px));
  justify-content: center;
  gap: 1rem;
`;

export const ContainerButtonSubmit = styled.div`
  display: flex;
  //justify-content: center;
  //margin: 1rem auto;
  margin: 1rem auto;
  width: 100%;
  button {
    width: 100%;
    color: white;
  }
`;

export const LegendStyle = styled.legend`
  padding: 0.7rem 1.5rem;
  background: ${({ themeType }) => themeType.layout};
  border-radius: 0.6rem;
  color: white;
  font-size: 11px;
  box-shadow: 2px 2px 3px black;
`;

const AddCustomer = () => {
  const { inputs, resetForm, handleChange, handleSelect } = useForm(initialValues);
  const [image, setImage] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState();
  const { modalIsOpen, openModal, closeModal } = useModal();
  const { userData, t, themeType } = useContext(ListCustomersTestContext);

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
    if (!inputs.price) {
      setValidationError(`You need to select Price`);
      return;
    }
    if (inputs.tip === '' || !inputs.tip) {
      inputs.tip = '0';
    }

    setIsLoading(true);
    inputs.timestamp = Date.now();
    inputs.addedDate = new Date().toISOString().slice(0, 10);
    inputs.userId = userData.userId;

    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/customers/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
      },
      body: JSON.stringify(inputs),
    });
    const resJSON = await res.json();
    if (!resJSON.error) {
      resetForm();
      setSubmitted(true);
      setIsLoading(false);
      openModal();
    } else {
      return;
    }
  };

  useEffect(() => {
    setValidationError();
  }, [inputs]);

  return (
    <ContainerForm onSubmit={handleSubmit} themeType={themeType}>
      <ContainerForms>
        <fieldset disabled={isLoading}>
          <LegendStyle themeType={themeType}>{t('formData.title')}</LegendStyle>
          <FormData inputs={inputs} handleChange={handleChange} handleSelect={handleSelect} />
        </fieldset>
        <fieldset disabled={isLoading}>
          <LegendStyle themeType={themeType}>{t('formVisit.title')}</LegendStyle>
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
            validationError={validationError}
            setValidationError={setValidationError}
          />
          <Button type="submit" text={t('button.addNewCustomer')} />
          {isLoading && (
            <ContainerLoadingSpinner>
              <LoadingSpinner asOverlay />
            </ContainerLoadingSpinner>
          )}
        </fieldset>
      </ContainerForms>
      {modalIsOpen && (
        <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
          <h2>{t('modal.addCustomer')}</h2>
          <p>{t('modal.wellDone')}</p>
        </Modal>
      )}
    </ContainerForm>
  );
};

export default AddCustomer;
