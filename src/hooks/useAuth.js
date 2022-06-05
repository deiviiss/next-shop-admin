import React, { useState, useContext, createContext } from 'react';
import endPoints from '@services/api';
import Cookie from 'js-cookie';
import axios from 'axios';

// crea el contexto de la aplicación
const AuthContext = createContext();

// contexto de la aplicación
function userProviderAuth() {
  const [user, setUser] = useState(null);

  const options = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };

  const signIn = async (email, password) => {

    // iniciar sesión
    const { data } = await axios.post(endPoints.auth.login, { email, password }, options);

    const token = data.access_token;
    if (token) {
      Cookie.set('token', token, { expires: 5 });

      // configura axios con valores default se carga el token con Bearer
      axios.defaults.headers.Authorization = `Bearer ${token}`;

      // solicito el usuario
      const { data: user } = await axios.get(endPoints.auth.profile);
      // se agrega user al context
      setUser(user);
    }
  };

  const logout = () => {
    Cookie.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
  };

  return {
    user,
    signIn,
    logout
  };
};

//propoga el contexto por la aplicación
export function ProviderAuth({ children }) {
  const auth = userProviderAuth(); //utilizo el contexto
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}


export const useAuth = () => {
  return useContext(AuthContext);
};

