'use client';

import { useRouter } from 'next/navigation';
import UIButton from './ui-button';

export default function GoBackButton() {
  const router = useRouter();
  return <UIButton label="Go back" onClick={() => router.back()} />;
}
