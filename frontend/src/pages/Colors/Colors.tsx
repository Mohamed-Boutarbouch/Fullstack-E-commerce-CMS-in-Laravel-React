import { getColors } from '@/services/colorServices';
import { useQuery } from '@tanstack/react-query';
import { useReadLocalStorage } from 'usehooks-ts';

export default function Colors() {
  const currentStoreId: string = useReadLocalStorage('currentStoreId') as string;

  const colors = useQuery({
    queryKey: ['billboards', currentStoreId],
    queryFn: () => getColors(currentStoreId),
  });

  console.log(colors);

  // billboards.isLoading && console.log(billboards.data);

  // const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
  //   id: item.id,
  //   label: item.label,
  //   createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  // }));
  return (
    <div className="">
      <h1>Colors</h1>
    </div>
  );
}
