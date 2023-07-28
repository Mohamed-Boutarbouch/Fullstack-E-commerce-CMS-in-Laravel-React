import { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

import { fetchCsrfToken } from '@/services/csrfToken';
import axiosClient from '@/services/axiosClient';

export interface Store {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  userId: string;
}

interface User {
  email: string;
  id: string;
  name: string;
  stores: Store[];
}

export async function getUserStores(userId: string) {
  try {
    await fetchCsrfToken();

    const { data }: AxiosResponse<User> = await axiosClient(`/users/${userId}`);

    return data;
  } catch (error) {
    toast.error('Something went wrong: ' + error);
    throw new Error('Error fetching data');
  }
}

// export function useUserStores(userId: string) {
//   return useQuery<User, Error>(['userStores', userId], () => getUserStores(userId));
// }
