import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useReadLocalStorage } from 'usehooks-ts';
import { toast } from 'react-hot-toast';

import axiosClient from '@/services/axiosClient';
import { useAuth } from '@/hooks/auth';
import { fetchCsrfToken } from '@/services/csrfToken';

export interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface StoreResponse {
  message: string;
}

interface CreateStoreParams {
  name: string;
  userId: string | undefined;
}

interface UpdateStoreParams {
  name: string;
  storeId: string | undefined;
}

interface UpdateStoreResponse {
  message: string;
  data: {
    id: string;
    name: string;
    userId: string;
  };
}

interface DeleteStoreParams {
  storeId: string;
}

export function useStoreApi() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const currentStoreId = useReadLocalStorage('currentStoreId');

  const storesQuery = useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      try {
        const { data } = await axiosClient<Store[]>(`/stores?user-id=${user.data?.id}`);
        return data;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!user.data?.id,
  });

  const doesStoreIdExists = storesQuery.data?.some((store) => store.id === currentStoreId);

  const createStore = useMutation<Store, unknown, CreateStoreParams>({
    mutationFn: async (values) => {
      return await createStoreApi(values);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      toast.success(`The store ${data.name} created successfully`);
    },
  });

  async function createStoreApi(values: CreateStoreParams): Promise<Store> {
    await fetchCsrfToken();

    const { data }: AxiosResponse<Store> = await axiosClient.post('/stores', values);

    return data;
  }

  const updateStore = useMutation<StoreResponse, unknown, UpdateStoreParams>({
    mutationFn: async (values) => {
      return await updateStoreApi(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      toast.success(`The store name updated successfully`);
    },
  });

  async function updateStoreApi(store: UpdateStoreParams): Promise<UpdateStoreResponse> {
    try {
      await fetchCsrfToken();

      const { data }: AxiosResponse<UpdateStoreResponse> = await axiosClient.patch(
        `stores/${store.storeId}`,
        store,
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const deleteStore = useMutation<StoreResponse, unknown, DeleteStoreParams>({
    mutationFn: async (values) => {
      return await deleteStoreApi(values.storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      toast.success(`The store deleted successfully`);
    },
  });

  async function deleteStoreApi(storeId: string): Promise<StoreResponse> {
    try {
      await fetchCsrfToken();

      const { data }: AxiosResponse<StoreResponse> = await axiosClient.delete(`stores/${storeId}`);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return { storesQuery, createStore, updateStore, deleteStore, doesStoreIdExists };
}
