import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import Button from '../../atoms/Button/Button';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import FormData from '../FormData/FormData';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';
import { ContainerLoadingSpinner } from '../../../assets/styles/GlobalStyle';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerEditCustomer = styled.div`
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

const EditCustomerDetails = () => {
  const [customer, setCustomer] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { inputs, resetForm, handleChange, handleSelect } = useForm(customer);
  const { modalIsOpen, openModal, closeModal } = useModal();
  const [error, setError] = useState(null);
  const { userData, t } = useContext(ListCustomersTestContext);
  const fetchCustomer = async () => {
    inputs.userId = userData.userId;
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/customers/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      },
    });
    const resJSON = await res.json();
    setCustomer(resJSON);
  };

  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    inputs.userId = userData.userId;
    const fetchEditCustomer = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userData.token,
        },
        body: JSON.stringify(inputs),
      });
      const resJSON = await res.json();
      if (!resJSON._id) {
        setError('something wrong');
      }
      openModal();
    };
    fetchEditCustomer();
  };

  return (
    <ContainerEditCustomer>
      <div>
        <Button text={t('button.back')} onClick={() => navigate(-1)} width="90px" />
        <Button text={t('button.resetForm')} onClick={() => resetForm()} width="90px" />
      </div>
      {customer ? (
        <form onSubmit={handleSubmit}>
          <FormData inputs={inputs} handleChange={handleChange} handleSelect={handleSelect} />
          <Button type="submit" text={t('button.editCustomer')} />
        </form>
      ) : (
        <ContainerLoadingSpinner>
          <LoadingSpinner asOverlay />
        </ContainerLoadingSpinner>
      )}
      {modalIsOpen && (
        <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
          {!error ? (
            <div>
              <h2>{t('modal.editCustomer')}</h2>
              <p>{t('modal.wellDone')}</p>
            </div>
          ) : (
            <p>{error}</p>
          )}
        </Modal>
      )}
    </ContainerEditCustomer>
  );
};

export default EditCustomerDetails;
