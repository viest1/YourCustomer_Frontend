import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { ListCustomersTestContext } from '../../../providers/GeneralProvider';
import SettingsItem from '../../organisms/SettingsItem/SettingsItem';
import Button from '../../atoms/Button/Button';
import useForm from '../../../hooks/useForm';
import { MdOutlineFormatColorReset } from 'react-icons/md';
import { FcCheckmark, FcOk } from 'react-icons/fc';
import { BsArrowRight } from 'react-icons/bs';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Modal from '../../organisms/Modal/Modal';
import useModal from '../../organisms/Modal/useModal';

export const Container = styled.div`
  padding: 0 2rem;
  max-width: 860px;
  margin: 2rem auto;
  //box-shadow: ${({ theme }) => theme.boxShadow.inside};
  border-radius: 1rem;
  @media all and (max-width: 400px) {
    padding: 0 1rem;
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
  padding: 1rem 0 2rem 0;
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
  div:last-child > p {
    padding: 0.5rem 0.9rem;
    box-shadow: 2px 2px 6px black;
    border-radius: 0.3rem;
    background: ${({ themeType }) => themeType.nav};
    color: white;
    font-size: 12px;
    text-align: center;
  }
  @media (max-width: 480px) {
    div:last-child {
      display: none;
    }
  }
`;

export const SelectStyle = styled.select`
  padding: 0.7rem 1rem;
  border-radius: 0.4rem;
  color: black;
  * {
    color: black;
  }
  @media (max-width: 480px) {
    padding: 0.4rem 0.6rem;
    width: 140px;
  }
`;

export const TypeSubMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem 1.5rem 0.2rem;
  gap: 0.4rem;
  p {
    padding: 0.7rem 1.1rem;
    box-shadow: 2px 2px 6px black;
    border-radius: 0.3rem;
    background: ${({ themeType }) => themeType.nav};
    color: white;
  }
  @media (min-width: 480px) {
    display: none;
  }
`;

export const ContainerPaypalButtons = styled.div`
  max-width: 500px;
`;

const Settings = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [errorMessagePassword, setErrorMessagePassword] = useState();
  const { userData, setUserData, themeType, setThemeType, t } = useContext(ListCustomersTestContext);
  const [desiredRole, setDesiredRole] = useState(userData.role);
  const { modalIsOpen, openModal, closeModal } = useModal();
  const { inputs, handleChange } = useForm({
    name: userData.name,
    email: userData.email,
    password: '',
    oldPassword: '',
    newPassword: '',
    repeatedNewPassword: '',
    actualRole: userData.role,
    userId: userData.userId,
    desiredRole,
  });
  const handleChangeEmailAndName = async (e) => {
    e.preventDefault();
    inputs.timestamp = Date.now();
    inputs.userId = userData.userId;
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/changeDataAccount', {
      method: 'PATCH',
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
      method: 'PATCH',
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
  const handleRoleChange = async () => {
    inputs.timestamp = Date.now();
    inputs.userId = userData.userId;
    inputs.role = desiredRole;
    const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/changeRoleOnAccount', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData?.token,
      },
      body: JSON.stringify(inputs),
    });
    const resJSON = await res.json();
    console.log(resJSON);
    setUserData({ ...userData, role: resJSON.role });
    if (resJSON.error) return setErrorMessagePassword(resJSON.message);
  };

  const createOrder = useCallback(
    (data, actions) => {
      // if(inputs.actualRole === inputs.desiredRole) return console.log('You have already this Type of Account')
      return (
        fetch(process.env.REACT_APP_BACKEND_URL + '/proceedBuy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userData?.token,
          },
          body: JSON.stringify({
            items: [
              {
                id: desiredRole === 'Premium' ? 2 : 1,
                quantity: 1,
              },
            ],
          }),
        })
          .then(async (res) => {
            const resJSON = await res.json();
            console.log(resJSON);
            if (res.ok) return resJSON.id;
            return await res.json().then((json) => Promise.reject(json));
          })
          // .then(({ id }) => {
          //   console.log('id', id);
          //   return id;
          // })
          .catch((e) => {
            console.error(e.error);
          })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [desiredRole]
  );

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
          <p>Type: {userData.role}</p>
        </div>
        {/*<h4>I want to buy a higher subscription and have access to premium features.</h4>*/}
      </ContainerDataAccount>
      <TypeSubMobile themeType={themeType}>
        <p>Type of Account:</p>
        <p>{userData.role}</p>
      </TypeSubMobile>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', maxWidth: '500px', padding: '0 0 2rem 0' }}>
        <Button text={'Choose Version'} iconRight={<BsArrowRight fill={'white'} />} />
        <SelectStyle name="planPricing" id="planPricing" value={`${desiredRole}`} onChange={(e) => setDesiredRole(e.target.value)}>
          <option value="Basic">Basic 0.01€</option>
          <option value="Premium">Premium 0.02€</option>
        </SelectStyle>
      </div>
      {inputs.actualRole !== desiredRole && (
        <ContainerPaypalButtons>
          <PayPalScriptProvider
            options={{ 'client-id': 'AY-LVB-kx-OsOie4JC4InEK-z3wfR-onR2hrbKMKOqJ4ovip0yezMQntET8iDZBlXEcAoHHdfDoLc7hu', currency: 'EUR' }}
          >
            <PayPalButtons
              createOrder={createOrder}
              onApprove={(data, actions) => {
                return actions.order.capture().then(async () => {
                  // const name = details.payer.name.given_name; (details - param)
                  await handleRoleChange();
                  openModal();
                });
              }}
            />
          </PayPalScriptProvider>
        </ContainerPaypalButtons>
      )}
      {modalIsOpen && (
        <Modal closeModal={closeModal} modalIsOpen={modalIsOpen}>
          <div>
            <div>
              <FcOk fontSize={70} />
            </div>
            <h2 style={{ textAlign: 'center', color: 'white' }}>Buying process successfully completed</h2>
          </div>
        </Modal>
      )}
      {/*<div style={{ maxWidth: '500px' }}>*/}
      {/*  <Button text={'Change'} width={'100%'} onClick={handleRoleChange} />*/}
      {/*</div>*/}
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
