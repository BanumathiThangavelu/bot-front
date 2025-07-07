/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useLogin.ts
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { AUTH_API } from '../constant/endpoints';
import { useNavigate } from 'react-router-dom';
import { CHATBOT } from '../constant/navigation';

type LoginData = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(AUTH_API.LOGIN, credentials);
      const accessToken = res?.data?.result?.accessToken;
      const refreshToken = res?.data?.result?.accessToken;
      const user = res?.data?.result?.user;
      if (accessToken && refreshToken && user) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
      }
      navigate(CHATBOT);
      return res.data;
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      setError(axiosError.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return [login, { loading, error }] as const;
};
