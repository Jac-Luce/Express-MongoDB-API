import React from 'react';

export default function GoogleAuth() {

    const handleGoogleAuth = () => {
        const googleURL = `${process.env.REACT_APP_SERVER_URL}/auth/googleLogin`;

        //_self apre il popup dell'autenticazione con google nella stessa finestra in cui siamo
        //_blank apre una nuova finestra
        window.open(googleURL, "_self");
    };
  return (
    <button onClick={handleGoogleAuth}>Accedi con Google </button>
  )
}
