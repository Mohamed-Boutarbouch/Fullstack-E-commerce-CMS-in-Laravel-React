import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  userId: string | undefined;
}

async function createStore(values: CreateStoreProps): Promise<StoreResponseData> {
  await fetchCsrfToken();

  const { data }: AxiosResponse<StoreResponseData> = await axiosClient.post('/stores', values);

  toast.success(`The store ${data.name} created successfully`);
  return data;
}

export function useCreateStoreMutation() {
  const queryClient = useQueryClient();

  return useMutation<StoreResponseData, unknown, CreateStoreProps>({
    mutationFn: async (values) => {
      return await createStore(values);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
  });
}
