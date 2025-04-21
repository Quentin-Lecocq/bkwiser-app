import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Betting App</h1>
      <Link href="/dashboard">
        <Button>Go to dashboard</Button>
      </Link>
    </main>
  );
}
