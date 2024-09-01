import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../server';

const CaptureToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token'); // Extract the token from query params

    if (token) {
      // You can now send the token to your backend or store it locally
      axios.post(`${server}/user/save-token`, { token })
        .then(() => {
          toast.success("Logged in successfully!");
          navigate('/'); // Redirect to home page
        })
        .catch(() => {
          toast.error("Failed to log in!");
        });
    }
  }, [navigate]);

  return null; 
};

export default CaptureToken;
