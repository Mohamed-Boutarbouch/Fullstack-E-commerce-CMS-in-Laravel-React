import { useReadLocalStorage } from 'usehooks-ts';

import axiosClient from '@/services/axiosClient';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/auth';

interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function useStoreApi() {
  const { user } = useAuth();
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

  return { storesQuery, doesStoreIdExists };
}
