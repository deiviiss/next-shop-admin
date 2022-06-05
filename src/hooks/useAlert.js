import { useState } from 'react';

const useAlert = (options) => {
  // elementos por defecto
  const defaultOptions = {
    active: false,
    message: '',
    type: '',
    autoClose: true,
  };

  //se desestrutura para poder unir más opciones
  const [alert, setAlert] = useState(
    {
      ...defaultOptions,
      ...options,
    }
  );


  const toggleAlert = () => {
    setAlert(!alert.active);
  };

  return {
    alert,
    setAlert,
    toggleAlert
  };

};

export default useAlert;