import { Label } from '@radix-ui/react-label';
import { Link } from 'react-router-dom';

export default function Overview() {
  return (
    <div className="">
      <h1 className="text-destructive">Overview</h1>
      <Label>Heello</Label>
      <Link to="/">Invoke Store Creation Model</Link>
    </div>
  );
}
