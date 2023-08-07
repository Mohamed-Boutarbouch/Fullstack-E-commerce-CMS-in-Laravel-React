import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useReadLocalStorage } from 'usehooks-ts';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import {
  Billboard,
  CreateBillboardParams,
  createBillboardApi,
  deleteBillboardApi,
  getBillboardApi,
  getBillboardsApi,
} from '@/services/billboardServices';

export function useBillboardApi() {
  const queryClient = useQueryClient();
  const { billboardId } = useParams();
  const currentStoreId: string = useReadLocalStorage('currentStoreId') as string;

  // const storesQuery = useQuery({
  //   queryKey: ['stores', user.data?.id],
  //   queryFn: () => getStoresApi(userId),
  //   enabled: !!user.data?.id,
  // });

  const billboardsQuery = useQuery({
    queryKey: ['billboards', currentStoreId],
    queryFn: () => getBillboardsApi(currentStoreId),
  });

  const billboardQuery = useQuery({
    queryKey: ['billboard', billboardId],
    queryFn: () => getBillboardApi(billboardId || ''),
    enabled: !!billboardId,
  });

  const createBillboard = useMutation<Billboard, unknown, CreateBillboardParams>({
    mutationFn: async (values) => {
      return await createBillboardApi(values);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['stores', 'billboards', variables.storeId] });
      toast.success(`The billboard created successfully`);
    },
  });

  // const updateBillboard = useMutation<void, unknown, UpdateBillboardParams>({
  //   mutationFn: async (values) => {
  //     return await updateBillboardApi(values);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['billboards'] });
  //     toast.success('The billboard updated successfully');
  //   },
  // });

  const deleteBillboard = useMutation<Billboard, unknown, { billboardId: string }>({
    mutationFn: async (values) => {
      return await deleteBillboardApi(values.billboardId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billboards'] });
      toast.success('The Billboard deleted successfully');
    },
  });

  return { billboardsQuery, billboardQuery, createBillboard, deleteBillboard };
}
