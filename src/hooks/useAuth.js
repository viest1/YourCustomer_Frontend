import { useContext, useEffect, useState } from 'react';
import { ListCustomersTestContext } from '../providers/GeneralProvider';
import { useNavigate } from 'react-router-dom';

export const useAuth = (inputs) => {
  const navigate = useNavigate();
  const { setUserData } = useContext(ListCustomersTestContext);
  const [errorMessageSignUp, setErrorMessageSignUp] = useState();
  const [errorMessageLogin, setErrorMessageLogin] = useState();
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    const signup = async () => {
      if(!inputs.email.match(mailFormat)){
        setErrorMessageSignUp('Error! Wrong E-Mail Format');
        return;
      }
      if(inputs.password.length < 5){
        setErrorMessageSignUp('Error! Password too short! Must be Min. 6 Signs');
        return;
      }
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      const resJSON = await res.json();
      if (!resJSON.userId) {
        setErrorMessageSignUp(resJSON.message);
        return;
      }
      navigate('/')
      setUserData({ token: resJSON.token, userId: resJSON.userId });
    };
    signup();
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const login = async () => {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });
      const resJSON = await res.json();
      if (!resJSON.userId) {
        setErrorMessageLogin(resJSON.message);
        console.log(errorMessageLogin);
        return;
      }
      setUserData({ token: resJSON.token, userId: resJSON.userId });
      navigate('/');
      console.log(resJSON);
    };
    login();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUserData({
      userId: '',
      token: '',
    });
    localStorage.removeItem('userDataListCustomersTest');
    navigate('/');
  };

  useEffect(() => {
    setErrorMessageLogin();
    setErrorMessageSignUp();
  }, [inputs]);

  return {
    handleSubmitLogin,
    handleSubmitSignUp,
    handleLogout,
    errorMessageLogin,
    errorMessageSignUp,
  };
};
