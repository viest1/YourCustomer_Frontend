import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import Button from '../../atoms/Button/Button';
import LoadingSpinner from '../../atoms/LoadingSpinner/LoadingSpinner';
import FormData from '../FormData/FormData';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';
import { ContainerLoadingSpinner } from '../../../assets/styles/GlobalStyle';

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
  const fetchCustomer = async () => {
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/customers/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const resJSON = await res.json();
    setCustomer(resJSON);
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchEditCustomer = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/customers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      await res.json();
      openModal();
    };
    fetchEditCustomer();
  };

  return (
    <ContainerEditCustomer>
      <div>
        <Button text="Back" onClick={() => navigate(-1)} width="80px" />
        <Button text="Reset Form" onClick={() => resetForm()} width="80px" />
      </div>
      {customer ? (
        <form onSubmit={handleSubmit}>
          <FormData inputs={inputs} handleChange={handleChange} handleSelect={handleSelect} />
          <Button type="submit" text="Edit Visit" />
        </form>
      ) : (
        <ContainerLoadingSpinner>
          <LoadingSpinner asOverlay />
        </ContainerLoadingSpinner>
      )}
      {modalIsOpen && (
        <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
          <h2>You Edited Customer correctly!</h2>
          <p>Well Done!</p>
        </Modal>
      )}
    </ContainerEditCustomer>
  );
};

export default EditCustomerDetails;
