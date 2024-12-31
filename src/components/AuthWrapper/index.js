"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import LoadingOverlay from "@/components/LoadingOverlay";

const AuthWrapper = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to the sign-in page if the user is not authenticated
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="h-screen">
        <LoadingOverlay loading />
      </div>
    ); // Optional: Add a loading state
  }

  if (session) {
    return <>{children}</>; // Render children if the user is authenticated
  }

  // `signIn` will handle unauthenticated cases, so no explicit return here.
};

export default AuthWrapper;
