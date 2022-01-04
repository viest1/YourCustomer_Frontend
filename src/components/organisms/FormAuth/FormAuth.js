import React, { useContext, useState } from 'react';
import FormLabelAndInput from '../../atoms/FormLabelAndInput/FormLabelAndInput';
import useForm from '../../../hooks/useForm';
import Button from '../../atoms/Button/Button';
import styled from 'styled-components';
import { useAuth } from '../../../hooks/useAuth';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';

export const ContainerFormAuth = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

export const ContainerForm = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;

const FormAuth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    email: '',
    password: '',
    emailLogin: '',
    passwordLogin: '',
  });
  const { t } = useContext(ListCustomersTestContext);
  const { handleSubmitSignUp, handleSubmitLogin, errorMessageSignUp, errorMessageLogin } = useAuth(inputs);

  const handleLoginMode = () => {
    setIsLoginMode((prev) => !prev);
    clearForm();
  };

  return (
    <ContainerFormAuth>
      <ContainerButton>
        <Button text={isLoginMode ? t('login.switchSign') : t('login.switchLogin')} onClick={handleLoginMode} width="200px" />
      </ContainerButton>
      {!isLoginMode ? (
        <ContainerForm onSubmit={handleSubmitSignUp}>
          <h2>{t('button.signup')}</h2>
          <FormLabelAndInput label={t('login.name')} id="name" handleInput={handleChange} value={inputs.name} />
          <FormLabelAndInput type="email" label="Email" id="email" handleInput={handleChange} value={inputs.email} />
          <FormLabelAndInput type="password" label={t('login.password')} id="password" handleInput={handleChange} value={inputs.password} />
          <Button type="submit" text={t('button.signup')} />
          {errorMessageSignUp && <p>{errorMessageSignUp}</p>}
        </ContainerForm>
      ) : (
        <ContainerForm onSubmit={handleSubmitLogin}>
          <h2>{t('button.login')}</h2>
          <FormLabelAndInput type="email" label="Email" id="emailLogin" handleInput={handleChange} value={inputs.emailLogin} />
          <FormLabelAndInput type="password" label={t('login.password')} id="passwordLogin" handleInput={handleChange} value={inputs.passwordLogin} />
          <Button type="submit" text={t('button.login')} />
          {errorMessageLogin && <p>{errorMessageLogin}</p>}
        </ContainerForm>
      )}
    </ContainerFormAuth>
  );
};

export default FormAuth;
