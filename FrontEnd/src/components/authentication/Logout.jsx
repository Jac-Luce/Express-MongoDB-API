import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contextProvider/AuthContextProvider';
import { useContext } from 'react';

export default function Logout({setToken}) {

    /*const {setToken} = useContext(AuthContext);*/

    const navigate = useNavigate();

    const pushLogout = () => {

        setToken("");

        localStorage.removeItem("token");

        navigate("/");
    };

  return (
    
    <Button onClick={pushLogout}>Logout</Button>
  )
}
