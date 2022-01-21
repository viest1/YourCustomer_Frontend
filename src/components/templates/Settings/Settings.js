import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import SettingsItem from '../../organisms/SettingsItem/SettingsItem';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';

export const Container = styled.div`
  padding: 2rem;
  max-width: 1360px;
  margin: 2rem auto 2rem auto;
  //box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
  @media all and (max-width: 400px) {
    padding: 1rem;
  }
`;

export const ContainerFormsChangeData = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const ContainerChangeData = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

// export const ContainerDataSettings = styled.div`
//   display: flex;
//   gap: 0.5rem;
//   flex-direction: column;
// `;

const Settings = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [errorMessagePassword, setErrorMessagePassword] = useState();
  const { userData, setUserData, setThemeType, t } = useContext(ListCustomersTestContext);
  const { inputs, handleChange } = useForm({
    name: userData.name,
    email: userData.email,
    password: '',
    oldPassword: '',
    newPassword: '',
    repeatedNewPassword: '',
  });
  const handleChangeEmailAndName = async (e) => {
    e.preventDefault();
    console.log('click');
    inputs.timestamp = Date.now();
    inputs.userId = userData.userId;
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/changeDataAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      },
      body: JSON.stringify(inputs),
    });
    const resJSON = await res.json();
    console.log(resJSON);
    if (resJSON.message) {
      return setErrorMessage(resJSON.message);
    }
    setUserData({ ...userData, email: resJSON.email, name: resJSON.name });
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    console.log('click');
    inputs.timestamp = Date.now();
    inputs.userId = userData.userId;
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      },
      body: JSON.stringify(inputs),
    });
    const resJSON = await res.json();
    console.log(resJSON);
    if (resJSON.message) {
      setErrorMessagePassword(resJSON.message);
    }
  };
  const handleChangeLayout = () => {
    setThemeType((prev) => !prev);
  };
  return (
    <Container>
      <div>
        <SettingsItem text={t('settings.changeLayout')} onClick={handleChangeLayout} />
      </div>
      <ContainerFormsChangeData>
        <ContainerChangeData onSubmit={handleChangeEmailAndName}>
          {/*<ContainerDataSettings>*/}
          {/*  <SettingsItem text="Your Subscription" data="Free" />*/}
          {/*</ContainerDataSettings>*/}
          <SettingsItem text="Email" data={inputs.email} element="input" onChange={handleChange} id="email" />
          <SettingsItem text={t('login.name')} data={inputs.name} element="input" onChange={handleChange} id="name" />
          <SettingsItem text={t('settings.password')} element="input" type="password" data={inputs.password} onChange={handleChange} id="password" />
          <Button text={t('button.submitChanges')} type="submit" />
          {errorMessage && <p>{errorMessage}</p>}
        </ContainerChangeData>
        <ContainerChangeData onSubmit={handleChangePassword}>
          <SettingsItem text={t('settings.oldPassword')} id="oldPassword" element="input" type="password" onChange={handleChange} />
          <SettingsItem text={t('settings.newPassword')} id="newPassword" element="input" type="password" onChange={handleChange} />
          <SettingsItem text={t('settings.repeatPassword')} id="repeatedNewPassword" element="input" type="password" onChange={handleChange} />
          <Button text={t('button.changePassword')} type="submit" />
          {errorMessagePassword && <p>{errorMessagePassword}</p>}
        </ContainerChangeData>
      </ContainerFormsChangeData>
    </Container>
  );
};

export default Settings;
