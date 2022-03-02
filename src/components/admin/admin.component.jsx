import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Movies from '../movies/movies.component';

const Admin = ({ token, isAdmin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token === '') {
      navigate('/login');
      return;
    }
  }, [navigate, token]);

  return <Movies isAdmin={isAdmin}></Movies>;
};

export default Admin;
