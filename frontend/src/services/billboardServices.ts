import axiosClient from '@/services/axiosClient';
import { fetchCsrfToken } from './csrfToken';
import { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

interface BillboardResponseData {
  id: string;
  label: string;
  imgUrl: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export async function getBillboards(storeId: string): Promise<BillboardResponseData[]> {
  try {
    const { data } = await axiosClient<BillboardResponseData[]>('/billboards', {
      params: { storeId },
    });
    return data;
  } catch (error) {
    throw error;
  }
}

interface CreateBillboardProps {
  // image: File;
  image?: any;
  label: string;
  storeId: string | undefined;
}

export async function createBillboardApi(
  values: CreateBillboardProps,
): Promise<BillboardResponseData> {
  await fetchCsrfToken();

  const { data }: AxiosResponse<BillboardResponseData> = await axiosClient.post(
    '/billboards',
    values,
  );

  toast.success(`The billboard created successfully`);
  return data;
}
