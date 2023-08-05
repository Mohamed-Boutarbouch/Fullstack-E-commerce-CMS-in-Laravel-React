// import { format } from "date-fns";

import { Link } from 'react-router-dom';
import { useBillboardApi } from '@/hooks/billboard-api';

export default function Billboards() {
  const { billboardsQuery } = useBillboardApi();

  // const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
  //   id: item.id,
  //   label: item.label,
  //   createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  // }));

  return (
    <div>
      <ul>
        {billboardsQuery.data?.map((billboard) => (
          <li key={billboard.id}>
            <Link to={billboard.id}>{billboard.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
