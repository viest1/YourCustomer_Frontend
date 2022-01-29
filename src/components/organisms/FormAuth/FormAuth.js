import React, { useContext, useState } from 'react';
import FormLabelAndInput from '../../atoms/FormLabelAndInput/FormLabelAndInput';
import useForm from '../../../hooks/useForm';
import Button from '../../atoms/Button/Button';
import styled from 'styled-components';
import { useAuth } from '../../../hooks/useAuth';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import { MdLockOutline, MdOutlineEmail, MdPermIdentity } from 'react-icons/md';

export const ContainerFormAuth = styled.div`
  padding: 2rem;
  margin: 4rem auto;
  max-width: 650px;
  background: ${({ theme }) => theme.color.white100};
  box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  @media (max-width:650px){
    max-width:95%;
  }
`;

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;

export const PasswordIcon = styled(MdLockOutline)`
  fill: ${({ theme }) => theme.color.main100};
`;

export const EmailIcon = styled(MdOutlineEmail)`
  fill: ${({ theme }) => theme.color.main100};
`;

export const NameIcon = styled(MdPermIdentity)`
  fill: ${({ theme }) => theme.color.main100};
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
      <h2>YourCustomer</h2>
      <div>
        <h2>{isLoginMode ? t('login.welcomeBack') : t('login.newHere')}</h2>
        <p>{isLoginMode ? t('login.happy') : t('login.joinUs')}</p>
      </div>
      {!isLoginMode ? (
        <ContainerForm onSubmit={handleSubmitSignUp}>
          {/*<h2>{t('button.signup')}</h2>*/}
          <FormLabelAndInput
            placeholder={'Name'}
            padding={'1.1rem 4rem'}
            icon={<NameIcon />}
            label={t('login.name')}
            id="name"
            handleInput={handleChange}
            value={inputs.name}
          />
          <FormLabelAndInput
            placeholder={'name@gmail.com'}
            padding={'1.1rem 4rem'}
            icon={<EmailIcon />}
            type="email"
            label="Email"
            id="email"
            handleInput={handleChange}
            value={inputs.email}
          />
          <FormLabelAndInput
            placeholder={'Password'}
            padding={'1.1rem 4rem'}
            icon={<PasswordIcon />}
            type="password"
            label={t('login.password')}
            id="password"
            handleInput={handleChange}
            value={inputs.password}
          />
          <Button type="submit" text={t('button.signup')} width={'100%'} />
          {errorMessageSignUp && <p>{errorMessageSignUp}</p>}
        </ContainerForm>
      ) : (
        <ContainerForm onSubmit={handleSubmitLogin}>
          {/*<h2>{t('button.login')}</h2>*/}
          <FormLabelAndInput
            placeholder={'name@gmail.com'}
            padding={'1.1rem 4rem'}
            icon={<EmailIcon />}
            type="email"
            label="Email"
            id="emailLogin"
            handleInput={handleChange}
            value={inputs.emailLogin}
          />
          <FormLabelAndInput
            placeholder={'Password'}
            padding={'1.1rem 4rem'}
            icon={<PasswordIcon />}
            type="password"
            label={t('login.password')}
            id="passwordLogin"
            handleInput={handleChange}
            value={inputs.passwordLogin}
          />
          <Button type="submit" text={t('button.login')} width={'100%'} />
          {errorMessageLogin && <p>{errorMessageLogin}</p>}
        </ContainerForm>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '2rem 0 0 0' }}>
        <p>{isLoginMode ? t('login.notHave') : t('login.have')} </p>
        <Button text={isLoginMode ? t('login.switchSign') : t('login.switchLogin')} onClick={handleLoginMode} width="200px" />
      </div>
    </ContainerFormAuth>
  );
};

export default FormAuth;
