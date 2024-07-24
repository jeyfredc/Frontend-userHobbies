import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../components/reducers/authReducer';
import { usersReducer } from '../components/reducers/usersReducer';

// Función para recuperar el estado inicial de localStorage
const loadState = () => {
  try {
    const token = localStorage.getItem('token');
    const logout = localStorage.getItem('logout');
    const users = localStorage.getItem('users');

    return {
      authReducer: {
        token: token ? JSON.parse(token) : '',
        logout: logout ? JSON.parse(logout) : false,
      },
      usersReducer: {
        users: users ? JSON.parse(users) : [],
      },
    };
  } catch (error) {
    // Si hay un error al recuperar el estado, retorna un estado vacío
    return undefined;
  }
};

// Carga el estado inicial
const preloadedState = loadState();

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    usersReducer: usersReducer,
  },
  preloadedState,
});

// Guarda el estado en localStorage cada vez que cambia
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('token', JSON.stringify(state.authReducer.token));
  localStorage.setItem('logout', JSON.stringify(state.authReducer.logout));
  localStorage.setItem('users', JSON.stringify(state.usersReducer.users));
});

export default store;
