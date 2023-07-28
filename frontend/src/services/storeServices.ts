import { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

import axiosClient from '@/services/axiosClient';
import { fetchCsrfToken } from '@/services/csrfToken';

interface StoreResponseData {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateStoreProps {
  name: string;
  userId: string;
}

export async function createStore(values: CreateStoreProps) {
  try {
    await fetchCsrfToken();

    const { data }: AxiosResponse<StoreResponseData> = await axiosClient.post('/stores', values);

    toast.success(`The store ${data.name} created successfully`);
  } catch (error) {
    toast.error('Something went wrong: ' + error);
  }
}
