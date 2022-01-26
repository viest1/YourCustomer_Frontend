import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import Button from '../../atoms/Button/Button';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import FormVisit from '../FormVisit/FormVisit';
import useModal from '../Modal/useModal';
import Modal from '../Modal/Modal';
import { ContainerLoadingSpinner } from '../../../assets/styles/GlobalStyle';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerEditVisit = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 2rem auto 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  & > div {
    display: flex;
    gap: 1rem;
  }
`;

const EditVisitDetails = () => {
  const [visit, setVisit] = useState();
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const { modalIsOpen, closeModal } = useModal();
  const { id } = useParams();
  const { userData, t } = useContext(ListCustomersTestContext);
  const { inputs, resetForm, handleChange, handleSelect } = useForm(visit);
  const previewFile = () => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      inputs.image = reader.result;
    };
  };
  const fetchVisit = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/visits/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
      },
    });
    const resJSON = await res.json();
    setVisit(resJSON);
  };

  useEffect(() => {
    fetchVisit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.correctedPrice || inputs.correctedPrice === '0' || inputs.correctedPrice === 0) {
      inputs.price = { ...inputs.price, value: `${inputs.correctedPrice} ${inputs.price.value.split(' ')[1]} ${inputs.price.value.split(' ')[2]}` };
      inputs.correctedPrice = inputs.price.value.split(' ')[0];
      inputs.comments = inputs.comments + ' Corrected: ' + inputs.correctedPrice + '€';
    }
    const fetchEditVisit = async () => {
      setIsLoading(true);
      inputs.userId = userData.userId;
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/visits/${id}`, {
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
      navigate('/visits');
    };
    fetchEditVisit();
  };

  return (
    <ContainerEditVisit>
      <div>
        <Button text={t('button.back')} onClick={() => navigate(-1)} width="90px" />
        <Button text={t('button.resetForm')} onClick={() => resetForm()} width="90px" />
        <h3>{visit?.customer?.contactName}</h3>
      </div>
      {visit ? (
        <form onSubmit={handleSubmit}>
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
            editMode
          />
          <Button type="submit" text={t('button.editVisit')} />
        </form>
      ) : (
        <ContainerLoadingSpinner>
          <LoadingSpinner asOverlay />
        </ContainerLoadingSpinner>
      )}
      {isLoading && (
        <ContainerLoadingSpinner>
          <LoadingSpinner asOverlay />
        </ContainerLoadingSpinner>
      )}
      {modalIsOpen && (
        <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
          <h2>{t('modal.editVisit')}</h2>
          <p>{t('modal.wellDone')}</p>
        </Modal>
      )}
    </ContainerEditVisit>
  );
};

export default EditVisitDetails;
