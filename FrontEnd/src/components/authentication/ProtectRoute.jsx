import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contextProvider/AuthContextProvider';

export default function ProtectRoute() {

    const {authenticated} = useContext(AuthContext);

  return (
    authenticated ? <Outlet /> : <Navigate to="/" />
  )   
}
