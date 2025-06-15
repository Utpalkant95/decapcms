'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthBridge() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));
    const token = params.get("access_token");

    if (token) {
      sessionStorage.setItem("cms_jwt", token);
      router.push("/admin?done=true");
    } else {
      router.push("/api/auth");
    }
  }, [router]);

  return <p style={{ fontFamily: "sans-serif" }}>Redirecting...</p>;
}
