import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import SettingsItem from '../../organisms/SettingsItem/SettingsItem';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import { MdOutlineFormatColorReset } from 'react-icons/md';
import { FcCheckmark } from 'react-icons/fc';

export const Container = styled.div`
  padding: 0 2rem;
  max-width: 860px;
  margin: 2rem auto;
  //box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
  @media all and (max-width: 400px) {
    padding: 1rem;
  }
`;

export const ContainerFormsChangeData = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 3rem 0;
  border-top: 1px solid grey;
`;

export const ContainerChangeData = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LayoutCircle = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 1px solid black;
  transition: transform 0.3s;
  position: relative;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
  span {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
  }
`;

export const ContainerDataAccount = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  flex-wrap: wrap;
  > div:first-child {
    padding: 1rem;
    border-radius: 50%;
    background: ${({ themeType }) => themeType.nav};
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > div:first-child h2 {
    color: white;
  }
  @media (max-width: 530px) {
    button:first-child {
      display: none;
    }
  }
`;

const Settings = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [errorMessagePassword, setErrorMessagePassword] = useState();
  const { userData, setUserData, themeType, setThemeType, t } = useContext(ListCustomersTestContext);
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
    inputs.timestamp = Date.now();
    inputs.userId = userData.userId;
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/changeDataAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
      },
      body: JSON.stringify(inputs),
    });
    const resJSON = await res.json();
    if (resJSON.message) {
      return setErrorMessage(resJSON.message);
    }
    setUserData({ ...userData, email: resJSON.email, name: resJSON.name });
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    inputs.timestamp = Date.now();
    inputs.userId = userData.userId;
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
      },
      body: JSON.stringify(inputs),
    });
    const resJSON = await res.json();
    if (resJSON.message) {
      setErrorMessagePassword(resJSON.message);
    }
  };
  const dataLayout = [
    {
      color: '#6201ed',
    },
    {
      color: '#29c0b1',
    },
    {
      color: '#222437',
    },
    {
      color: '#2c50ed',
    },
    {
      color: 'white',
    },
  ];
  const dataButton = [
    {
      color: '#6201ed',
    },
    {
      color: '#29c0b1',
    },
    {
      color: '#222437',
    },
    {
      color: '#2c50ed',
    },
  ];
  return (
    <Container>
      <ContainerDataAccount themeType={themeType}>
        <div>
          <h2>{`${userData.name.split(' ')[0].split('')[0]}${
            userData.name.split(' ').length > 1 ? userData.name.split(' ')[1].split('')[0] : ''
          }`}</h2>
        </div>
        <div>
          <h2>{userData.name}</h2>
          <p>{userData.email}</p>
        </div>
        <div>
          <Button text={t('navigation.logout')} width={'120px'} />
        </div>
      </ContainerDataAccount>
      <div style={{ padding: '1rem 0 0 0', borderBottom: '1px solid grey' }}>
        <h2>Customize Your Layout</h2>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', width: '280px', justifyContent: 'space-between', padding: '2rem 0 0 0' }}>
        <div>
          <p>Cards Layout</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {dataLayout.map((item, i) => (
            <LayoutCircle
              marked={themeType.layout === item.color}
              key={i}
              style={{ background: item.color }}
              onClick={() => setThemeType({ ...themeType, layout: item.color })}
            >
              {themeType.layout === item.color && (
                <span>
                  <FcCheckmark />
                </span>
              )}
            </LayoutCircle>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', width: '280px', justifyContent: 'space-between' }}>
        <div>
          <p>Buttons</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {dataButton.map((item, i) => (
            <LayoutCircle key={i} style={{ background: item.color }} onClick={() => setThemeType({ ...themeType, button: item.color })}>
              {themeType.button === item.color && (
                <span>
                  <FcCheckmark />
                </span>
              )}
            </LayoutCircle>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', width: '280px', justifyContent: 'space-between' }}>
        <div>
          <p>Navigation</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {dataButton.map((item, i) => (
            <LayoutCircle key={i} style={{ background: item.color }} onClick={() => setThemeType({ ...themeType, nav: item.color })}>
              {themeType.nav === item.color && (
                <span>
                  <FcCheckmark />
                </span>
              )}
            </LayoutCircle>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 0 2rem 0' }}>
        <SettingsItem
          text={t('settings.resetLayout')}
          icon={
            <MdOutlineFormatColorReset
              fontSize={28}
              onClick={() =>
                setThemeType({
                  button: '#222437',
                  layout: '#6201ed',
                  nav: '#6201ed',
                })
              }
            />
          }
        />
      </div>
      <div style={{ padding: '0 0 0 0' }}>
        <h2>Change Your Data</h2>
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
