import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useReadLocalStorage } from 'usehooks-ts';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/hooks/auth';
import {
  CreateStoreParams,
  Store,
  StoreResponse,
  UpdateStoreParams,
  createStoreApi,
  deleteStoreApi,
  getStoresApi,
  updateStoreApi,
} from '@/services/storeServices';

export function useStoreApi() {
  const { user } = useAuth();
  const userId = user.data && user.data.id;

  const queryClient = useQueryClient();
  const currentStoreId = useReadLocalStorage('currentStoreId');

  const storesQuery = useQuery({
    queryKey: ['stores', user.data?.id],
    queryFn: () => getStoresApi(userId),
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

  const updateStore = useMutation<void, unknown, UpdateStoreParams>({
    mutationFn: async (values) => {
      return await updateStoreApi(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      toast.success(`The store name updated successfully`);
    },
  });

  const deleteStore = useMutation<StoreResponse, unknown, { storeId: string }>({
    mutationFn: async (values) => {
      return await deleteStoreApi(values.storeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] });
      toast.success(`The store deleted successfully`);
    },
  });

  return { storesQuery, createStore, updateStore, deleteStore, doesStoreIdExists };
}
