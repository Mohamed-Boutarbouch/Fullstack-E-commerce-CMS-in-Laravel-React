import axiosClient from '@/services/axiosClient';

interface ColorResponseData {
  id: string;
  name: string;
  value: string;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export async function getColors(storeId: string): Promise<ColorResponseData[]> {
  try {
    const { data } = await axiosClient<ColorResponseData[]>('/colors', {
      params: { storeId },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
