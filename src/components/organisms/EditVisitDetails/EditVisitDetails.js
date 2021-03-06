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
import { LegendStyle } from '../../templates/AddCustomer/AddCustomer';
import { MdArrowBack } from 'react-icons/md';
import { BiReset } from 'react-icons/bi';

export const ContainerEditVisit = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
  @media (max-width: 600px) {
    padding: 0.6rem;
  }
  > div:first-child {
    margin-left: 0.2rem;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.8rem;
    width: 100%;
    box-shadow: 4px 4px 6px ${({ themeType }) => themeType.layout};
    position: relative;
    h3 {
      padding: 0.7rem 1.5rem;
      background: ${({ themeType }) => themeType.layout};
      border-radius: 0.6rem;
      color: white;
      font-size: 11px;
      box-shadow: 2px 2px 3px black;
      position: absolute;
      top: -47px;
      right: 16px;
      @media (max-width: 400px) {
        max-width: 150px;
      }
    }
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
  const { userData, t, themeType } = useContext(ListCustomersTestContext);
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
      inputs.comments = inputs.comments + ' Corrected: ' + inputs.correctedPrice + '???';
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
    <ContainerEditVisit themeType={themeType}>
      <div>
        <Button text={t('button.back')} icon={<MdArrowBack fill={'white'} />} onClick={() => navigate(-1)} width="90px" />
        <Button text={t('button.resetForm')} onClick={() => resetForm()} icon={<BiReset fill={'white'} />} />
      </div>
      {visit ? (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <h3>{visit?.customer?.contactName}</h3>
            <LegendStyle themeType={themeType}>{t('button.editVisit')}</LegendStyle>
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
            <Button type="submit" text={t('button.editVisit')} width={'100%'} />
          </fieldset>
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
          <h2 style={{ color: 'white' }}>{t('modal.editVisit')}</h2>
          <p style={{ color: 'white' }}>{t('modal.wellDone')}</p>
        </Modal>
      )}
    </ContainerEditVisit>
  );
};

export default EditVisitDetails;
