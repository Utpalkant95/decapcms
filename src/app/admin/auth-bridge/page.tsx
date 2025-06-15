'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthBridge() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.slice(1)).get('access_token');

    if (token) {
      localStorage.setItem('cms_github_token', token);  // 🔐 store raw GitHub token
      router.push('/admin');
    } else {
      router.push('/api/auth');
    }
  }, [router]);

  return <p>Redirecting to admin...</p>;
}
