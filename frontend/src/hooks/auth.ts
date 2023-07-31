import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { AxiosError, isAxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import axiosClient from '@/services/axiosClient';
import { fetchCsrfToken } from '@/services/csrfToken';

export interface Store {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  stores?: Store[];
}

interface ErrorQueryResponse {
  message: string;
}

interface ErrorMutationResponse {
  message: string;
  errors: {
    email?: string[];
    password?: string[];
  };
}

export type ErrorQuery = AxiosError<ErrorQueryResponse>;

export type QueryResponse<T> = T | undefined;

export type ErrorMutation = AxiosError<ErrorMutationResponse>;

export interface Params {
  middleware?: 'guest' | 'auth';
  redirectIfAuthenticated?: string;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginParams {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface ResetPasswordParams {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ResendEmailVerificationParams {
  setStatus: Dispatch<SetStateAction<string | null>>;
}

export const useAuth = ({ middleware = 'auth', redirectIfAuthenticated }: Params = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const [status, setStatus] = useState<string | null>('');
  const [errorMessages, setErrorMessages] = useState<string[] | null>([]);

  const user = useQuery<QueryResponse<User>, ErrorQuery>({
    queryKey: ['user'],
    queryFn: async (): Promise<QueryResponse<User>> => {
      try {
        const { data } = await axiosClient<User>('/user');
        return data;
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status !== 409) {
          throw error;
        }
        navigate('/verify-email');
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const isAuthenticated = !!user?.data;

  const register = useMutation<void, ErrorMutation, RegisterParams>({
    mutationFn: async (props) => {
      await fetchCsrfToken();

      setErrorMessages([]);

      await axiosClient.post('/register', props);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
    onError: (error: AxiosError) => {
      if (isAxiosError(error)) {
        const err = error as ErrorMutation;
        const errorMessages = err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat()
          : [];
        setErrorMessages(errorMessages);
      }
    },
  });

  const login = useMutation<void, ErrorMutation, LoginParams>({
    mutationFn: async (props) => {
      await fetchCsrfToken();

      setErrorMessages([]);
      setStatus(null);

      await axiosClient.post('/login', props);
      await user?.refetch();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
    onError: (error: AxiosError) => {
      if (isAxiosError(error)) {
        const err = error as ErrorMutation;
        const errorMessages = err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat()
          : [];
        setErrorMessages(errorMessages);
      }
    },
  });

  const forgotPassword = useMutation<void, ErrorMutation, ForgotPasswordParams>({
    mutationFn: async (prop) => {
      await fetchCsrfToken();

      setErrorMessages([]);
      setStatus(null);

      const { data } = await axiosClient.post('/forgot-password', prop);
      setStatus(data.status);
    },
    onError: (error: AxiosError) => {
      if (isAxiosError(error)) {
        const err = error as ErrorMutation;
        const errorMessages = err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat()
          : [];
        setErrorMessages(errorMessages);
      }
    },
  });

  const resetPassword = useMutation<void, ErrorMutation, ResetPasswordParams>({
    mutationFn: async (props) => {
      await fetchCsrfToken();

      setErrorMessages([]);
      setStatus(null);

      const response = await axiosClient.post('/reset-password', {
        token: params.token,
        ...props,
      });
      navigate(`/login?reset=${btoa(response.data.status)}`);
    },
    onError: (error: AxiosError) => {
      if (isAxiosError(error)) {
        const err = error as ErrorMutation;
        const errorMessages = err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat()
          : [];
        setErrorMessages(errorMessages);
      }
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      if (!user?.error) {
        await fetchCsrfToken();
        await axiosClient.post('/logout');
      }
      window.location.pathname = '/log-in';
    },
    onSuccess: () => queryClient.removeQueries({ queryKey: ['user'] }),
  });

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user?.data) {
      navigate(redirectIfAuthenticated);
    }
  }, [user?.data, middleware, redirectIfAuthenticated, navigate]);

  useEffect(() => {
    if (middleware === 'auth' && user?.error) {
      logout.mutate();
    }
  }, [user?.error, middleware, logout]);

  return {
    user,
    isAuthenticated,
    register,
    login,
    forgotPassword,
    resetPassword,
    logout,
    errorMessages,
    status,
    setStatus,
  };
};
