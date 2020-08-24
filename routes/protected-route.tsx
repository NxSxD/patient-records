import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../users";
import { useEffect } from "react";

export function ProtectRoute(
  Component: React.ComponentType<any> | React.FC<any>
) {
  return function pretectedRoute(props: any) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !loading) router.push("/");
    }, [loading, isAuthenticated]);

    return <Component {...props} />;
  };
}
