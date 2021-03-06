import React, { useContext, useEffect, useState } from 'react';
import FormVisit from '../FormVisit/FormVisit';
import Button from '../../atoms/Button/Button';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import { ContainerEditVisit } from '../EditVisitDetails/EditVisitDetails';
import { useNavigate, useParams } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import useModal from '../Modal/useModal';
import Modal from '../Modal/Modal';
import { ContainerLoadingSpinner } from '../../../assets/styles/GlobalStyle';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import { LegendStyle } from '../../templates/AddCustomer/AddCustomer';
import { MdArrowBack, MdClear } from 'react-icons/md';

const AddNewVisit = () => {
  const [image, setImage] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [isLoading, setIsLoading] = useState();
  const [customer, setCustomer] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { modalIsOpen, openModal, closeModal } = useModal();
  const [validationError, setValidationError] = useState();
  const previewFile = () => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      inputs.image = reader.result;
    };
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const { inputs, handleChange, handleSelect, clearForm } = useForm({
    tip: '0',
    premium: [{ label: 'No', value: '0' }],
    behavior: { label: '3', value: 'ok' },
    extraPay: { label: 'No', value: '0' },
    time: '01:45',
    hour: '14:45',
    price: '',
  });
  const { userData, t, themeType } = useContext(ListCustomersTestContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchAddVisit = async () => {
      if (!inputs.price) {
        setValidationError(`You need to select Price`);
        return;
      }
      setIsLoading(true);
      inputs.timestamp = Date.now();
      inputs.addedDate = new Date().toISOString().slice(0, 10);
      inputs.userId = userData.userId;
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customers/${id}/addVisit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userData.token,
        },
        body: JSON.stringify(inputs),
      });
      await res.json();
      setSubmitted(true);
      setIsLoading(false);
      openModal();
      clearForm();
    };
    fetchAddVisit();
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${userData.userId}/customer/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + userData?.token,
        },
      });
      const resJSON = await res.json();
      setCustomer(resJSON);
    };
    fetchCustomerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, userData.userId]);

  return (
    <ContainerEditVisit themeType={themeType}>
      <div>
        <Button text="Back" icon={<MdArrowBack fill={'white'} />} onClick={() => navigate(-1)} width="90px" />
        <Button text="Clear Form" onClick={() => clearForm()} icon={<MdClear fill={'white'} />} />
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h3>{customer[0]?.contactName}</h3>
          <LegendStyle themeType={themeType}>{t('button.addNewVisit')}</LegendStyle>
          <FormVisit
            inputs={inputs}
            handleChange={handleChange}
            handleSelect={handleSelect}
            previewSource={previewSource}
            previewFile={previewFile}
            image={image}
            setImage={setImage}
            setPreviewSource={setPreviewSource}
            submitted={submitted}
            setSubmitted={setSubmitted}
            validationError={validationError}
            setValidationError={setValidationError}
          />
          <Button type="submit" text={t('button.addNewVisit')} width={'100%'} />
        </fieldset>
      </form>
      {modalIsOpen && (
        <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
          <h2>{t('modal.addVisit')}</h2>
          <p>{t('modal.wellDone')}</p>
        </Modal>
      )}
      {isLoading && (
        <ContainerLoadingSpinner>
          <LoadingSpinner asOverlay />
        </ContainerLoadingSpinner>
      )}
    </ContainerEditVisit>
  );
};

export default AddNewVisit;
