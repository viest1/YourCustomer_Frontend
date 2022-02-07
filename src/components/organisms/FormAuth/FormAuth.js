import React, { useContext, useEffect, useState } from 'react';
import FormLabelAndInput from '../../atoms/FormLabelAndInput/FormLabelAndInput';
import useForm from '../../../hooks/useForm';
import Button from '../../atoms/Button/Button';
import styled from 'styled-components';
import { useAuth } from '../../../hooks/useAuth';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import { MdLockOutline, MdOutlineEmail, MdPermIdentity } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from '../../atoms/Logo/Logo';

export const ContainerFormAuth = styled.div`
  padding: 2rem;
  margin: 4rem auto;
  max-width: 650px;
  background: ${({ theme }) => theme.color.white100};
  //box-shadow: ${({ theme }) => theme.boxShadow.inside};
  box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.2);
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  @media (max-width: 650px) {
    max-width: 95%;
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

export const ForgotPassword = styled.p`
  margin: 0 0 0 auto;
  padding: 0.2rem;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const FormAuth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    email: '',
    password: '',
    emailLogin: '',
    passwordLogin: '',
    emailToResetPassword: '',
    passwordReset: '',
  });
  const { t } = useContext(ListCustomersTestContext);
  const { handleSubmitSignUp, handleSubmitLogin, errorMessageSignUp, errorMessageLogin } = useAuth(inputs);
  const { tokenVerifyEmail, tokenResetPassword } = useParams();
  const [message, setMessage] = useState();
  const [messageError, setMessageError] = useState();
  const navigate = useNavigate();

  const handleLoginMode = () => {
    setIsLoginMode((prev) => !prev);
    clearForm();
  };

  useEffect(() => {
    let timeout;
    if (message) {
      timeout = setTimeout(() => {
        setMessage();
      }, 5000);
    } else {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [message]);

  useEffect(() => {
    let timeout;
    if (messageError) {
      timeout = setTimeout(() => {
        setMessageError();
      }, 5000);
    } else {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout);
  }, [messageError]);

  const handleVerifyEmail = () => {
    const fetchVerify = async () => {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/verifyEmail', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenVerifyEmail }),
      });
      const resJSON = await res.json();
      console.log(resJSON);
      if (resJSON.error) return setMessageError('Something went wrong');
      return setMessage('You Verified Email Correct. You can Now Log In');
    };
    fetchVerify();
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const handleSendEmailToResetPassword = (e) => {
    e.preventDefault();
    const fetchSendEmailToResetPassword = async () => {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/sendEmailToResetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailToResetPassword: inputs.emailToResetPassword, timestamp: Date.now() }),
      });
      const resJSON = await res.json();
      console.log(resJSON);
      if (resJSON.error) return setMessageError('Something went wrong');
      return setMessage('Check your Mailbox');
    };
    fetchSendEmailToResetPassword();
  };
  const handleResetPassword = (e) => {
    e.preventDefault();
    const fetchSetNewPassword = async () => {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/setNewPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passwordReset: inputs.passwordReset, tokenResetPassword }),
      });
      const resJSON = await res.json();
      console.log(resJSON);
      if (resJSON.error) return setMessageError('Something went wrong');
      return setMessage('You changed password correctly');
    };
    fetchSetNewPassword();
  };

  if (tokenVerifyEmail) {
    return (
      <ContainerFormAuth>
        {tokenVerifyEmail && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Logo /> <h2>YourCustomer</h2>
            </div>
            <div>
              <h2>{'Verification E-mail'}</h2>
              <p>Click on button and verify your e-mail</p>
            </div>
            <ContainerForm as={'div'}>
              <Button loginBtn type="button" text={'Verify E-mail'} width={'100%'} onClick={handleVerifyEmail} />
              {messageError ||
                (message && (
                  <div>
                    <p>{messageError ? messageError : message}</p>
                  </div>
                ))}
            </ContainerForm>
          </>
        )}
      </ContainerFormAuth>
    );
  }

  if (resetPasswordMode) {
    return (
      <ContainerFormAuth>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Logo /> <h2>YourCustomer</h2>
        </div>
        <div>
          <h2>{'Reset Password'}</h2>
          <p>Enter your e-mail and you get link to Reset Password</p>
        </div>
        <ContainerForm onSubmit={handleSendEmailToResetPassword}>
          <FormLabelAndInput
            placeholder={'name@gmail.com'}
            padding={'1.1rem 4rem'}
            icon={<EmailIcon />}
            type="email"
            label="Email"
            id="emailToResetPassword"
            handleInput={handleChange}
            value={inputs.emailToResetPassword}
          />
          {messageError ||
            (message && (
              <div>
                <p>{messageError ? messageError : message}</p>
              </div>
            ))}
          <ForgotPassword type={'button'} onClick={() => setResetPasswordMode(false)}>
            Back
          </ForgotPassword>
          <Button loginBtn type="submit" text={'Reset Password'} width={'100%'} />
        </ContainerForm>
      </ContainerFormAuth>
    );
  }

  if (tokenResetPassword) {
    return (
      <ContainerFormAuth>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Logo /> <h2>YourCustomer</h2>
        </div>
        <div>
          <h2>{'Setting New Password'}</h2>
          <p>Enter Your New Password and Click Button</p>
        </div>
        <ContainerForm onSubmit={handleResetPassword}>
          <FormLabelAndInput
            placeholder={'Password'}
            padding={'1.1rem 4rem'}
            icon={<PasswordIcon />}
            type="password"
            label={t('login.password')}
            id="passwordReset"
            handleInput={handleChange}
            value={inputs.passwordReset}
          />
          {messageError ||
            (message && (
              <div>
                <p>{messageError ? messageError : message}</p>
              </div>
            ))}
          <Button loginBtn type="submit" text={'Set New Password'} width={'100%'} />
        </ContainerForm>
      </ContainerFormAuth>
    );
  }

  return (
    <ContainerFormAuth>
      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
        <Logo />
        <h2>YourCustomer</h2>
      </div>
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
          <ForgotPassword type={'button'} onClick={() => setResetPasswordMode(true)}>
            Forgot password?
          </ForgotPassword>
          <Button loginBtn type="submit" text={t('button.signup')} width={'100%'} />
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
          <ForgotPassword type={'button'} onClick={() => setResetPasswordMode(true)}>
            Forgot password?
          </ForgotPassword>
          <Button loginBtn type="submit" text={t('button.login')} width={'100%'} />
          {errorMessageLogin && <p>{errorMessageLogin}</p>}
        </ContainerForm>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '2rem 0 0 0' }}>
        <p>{isLoginMode ? t('login.notHave') : t('login.have')} </p>
        <Button loginBtn text={isLoginMode ? t('login.switchSign') : t('login.switchLogin')} onClick={handleLoginMode} width="200px" />
      </div>
    </ContainerFormAuth>
  );
};

export default FormAuth;
