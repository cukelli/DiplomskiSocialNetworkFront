import  { useState } from 'react';

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    return tokenString;
  };
  

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    userToken.replace(/['"]+/g, '')
    localStorage.setItem('token', userToken.token);
    userToken.token.replace(/['"]+/g, '')

    setToken(userToken.token);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    setToken: saveToken,
    clearToken,
    token,
  };
};

export default useToken;
