import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Layout from './containers/Layout/Layout';

import { Router } from 'react-router-dom';
import { history } from './utils/history';
import { IS_PRODUCTION } from './consts';

const { createContext, useReducer, useContext } = React;

type AuthState = {
  access_token: string | null;
}

type DispatchType = (values: AuthState) => void;

const initialAuthState = {
  access_token: window.localStorage.getItem(`access_token`)
}

const AuthStateContext = createContext(initialAuthState)
const DispatchStateContext = createContext({} as DispatchType)

const AuthStateProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(
    (state: AuthState, newValue: AuthState) => {
      /// set authsate
      if (newValue.access_token) {
        window.localStorage.setItem(`access_token`, newValue.access_token)
      }
      else {
        window.localStorage.removeItem(`access_token`)
      }
      return ({ ...state, ...newValue })
    },
    initialAuthState
  )
  return (
    <AuthStateContext.Provider value={state}>
      <DispatchStateContext.Provider value={dispatch}>
        {children}
      </DispatchStateContext.Provider>
    </AuthStateContext.Provider>
  );
}

export const useAuthState = (): [AuthState, DispatchType] => {
  return [
    useContext(AuthStateContext),
    useContext(DispatchStateContext)
  ]
}

if (!IS_PRODUCTION) {
  console.warn(`DEV MODE`)
}

function App() {
  return (
    <AuthStateProvider>
      <Router history={history}>
        <Layout />
      </Router>
    </AuthStateProvider>
  )
}

export default App
