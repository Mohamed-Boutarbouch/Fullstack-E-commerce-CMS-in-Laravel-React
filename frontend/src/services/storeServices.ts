import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';

interface DeleteStoreResponse {
  message: string;
}

export async function deleteStoreApi(storeId: string): Promise<DeleteStoreResponse> {
  try {
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
    const { data }: AxiosResponse<UpdateStoreResponse> = await axiosClient.patch(
      `stores/${store.storeId}`,
      store,
    );

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
