import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { Magic } from 'magic-sdk';

const ProtectedRoutes = ({ element: Component, ...rest }) => {
  useEffect(() => {
    const renewToken = async () => {
      const token = Cookies.get('token');

      if (token) {
        try {
          // If there is a token, increase its lifespan
          const magic = new Magic(import.meta.env.VITE_MAGIC_PUBLISHABLE_KEY);
          const newToken = await magic.user.getIdToken({ lifespan: 7 * 24 * 60 * 60 });

          Cookies.set('token', newToken); // Set or refresh the token with a new expiration
        } catch (error) {
          console.error('Error renewing token:', error);
          // Handle the error as needed
        }
      }
    };

    renewToken();
  }, []);

  return Cookies.get('token') ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
