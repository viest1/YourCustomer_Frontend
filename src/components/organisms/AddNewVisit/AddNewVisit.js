import React, { useContext, useState } from 'react';
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

const AddNewVisit = () => {
  const [image, setImage] = useState();
  const [previewSource, setPreviewSource] = useState();
  const [isLoading, setIsLoading] = useState();
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
  const { inputs, handleChange, handleSelect, clearForm } = useForm({ tip: '0' });
  const { userData } = useContext(ListCustomersTestContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchAddVisit = async () => {
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

  return (
    <ContainerEditVisit>
      <div>
        <Button text="Back" onClick={() => navigate(-1)} width="80px" />
        <Button text="Clear Form" onClick={() => clearForm()} width="80px" />
      </div>
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
        />
        <Button type="submit" text="Add New Visit" />
        {validationError && <p>{validationError}</p>}
      </form>
      {modalIsOpen && (
        <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
          <h2>You added Visit correctly!</h2>
          <p>Well Done!</p>
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
