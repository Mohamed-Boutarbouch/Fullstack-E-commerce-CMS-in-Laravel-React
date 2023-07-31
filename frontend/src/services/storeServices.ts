import { AxiosResponse } from 'axios';

import axiosClient from '@/services/axiosClient';
import { fetchCsrfToken } from '@/services/csrfToken';

interface DeleteStoreResponse {
  message: string;
}

export async function deleteStoreApi(storeId: string): Promise<DeleteStoreResponse> {
  try {
    await fetchCsrfToken();

    const { data }: AxiosResponse<DeleteStoreResponse> = await axiosClient.delete(
      `stores/${storeId}`,
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface UpdateStoreResponse {
  message: string;
  data: {
    id: string;
    name: string;
    userId: string;
  };
}

export async function updateStoreApi(store: {
  storeId: string | undefined;
  name: string;
}): Promise<UpdateStoreResponse> {
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
