import { useQuery } from '@tanstack/react-query';
import { useReadLocalStorage } from 'usehooks-ts';
// import { format } from "date-fns";

import { getBillboards } from '@/services/billboardServices';

export default function Billboards() {
  const currentStoreId: string = useReadLocalStorage('currentStoreId') as string;

  // const billboards =
  useQuery({
    queryKey: ['billboards', currentStoreId],
    queryFn: () => getBillboards(currentStoreId),
  });

  // billboards.isLoading && console.log(billboards.data);

  // const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
  //   id: item.id,
  //   label: item.label,
  //   createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  // }));

  return (
    <div className="">
      <p>gg</p>
    </div>
  );
}
