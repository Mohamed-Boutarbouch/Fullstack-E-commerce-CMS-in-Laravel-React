import { AxiosResponse } from 'axios';

import axiosClient from '@/services/axiosClient';
import { fetchCsrfToken } from '@/services/csrfToken';
import fileClient from '@/services/fileClient';

export interface Billboard {
  id: string;
  label: string;
  imgUrl: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export async function getBillboardsApi(storeId: string): Promise<Billboard[]> {
  try {
    const { data } = await axiosClient<Billboard[]>('/billboards', {
      params: { storeId },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// TODO: Account for billboardId empty string use case
export async function getBillboardApi(billboardId: string): Promise<Billboard> {
  try {
    const { data } = await axiosClient<Billboard>(`/billboards/${billboardId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export interface CreateBillboardParams {
  label: string;
  image: File;
  storeId: string | undefined;
}

export async function createBillboardApi(values: CreateBillboardParams): Promise<Billboard> {
  await fetchCsrfToken();

  const { data }: AxiosResponse<Billboard> = await fileClient.post('/billboards', values);
  return data;
}
