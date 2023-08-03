import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';
import { fetchCsrfToken } from './csrfToken';

export interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoreResponse {
  message: string;
}

export interface CreateStoreParams {
  name: string;
  userId: string | undefined;
}

export interface UpdateStoreParams {
  name: string;
  storeId: string | undefined;
}

export async function getStoresApi(userId: string | undefined) {
  try {
    const { data } = await axiosClient<Store[]>(`/stores?user-id=${userId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createStoreApi(values: CreateStoreParams): Promise<Store> {
  await fetchCsrfToken();

  try {
    const { data }: AxiosResponse<Store> = await axiosClient.post('/stores', values);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateStoreApi(store: UpdateStoreParams) {
  try {
    await fetchCsrfToken();

    const { data } = await axiosClient.patch(`stores/${store.storeId}`, store);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteStoreApi(storeId: string): Promise<StoreResponse> {
  try {
    await fetchCsrfToken();

    const { data }: AxiosResponse<StoreResponse> = await axiosClient.delete(`stores/${storeId}`);
    return data;
  } catch (error) {
    throw error;
  }
}
