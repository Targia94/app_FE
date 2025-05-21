import { useSession } from "@/libs/hooks/useSession";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

interface IGrantPermissionProps {
  to: string[];
  asPageWrapper?: boolean;
  children: ReactNode;
}

export default function GrantPermission({
  to,
  asPageWrapper,
  children,
}: IGrantPermissionProps) {
  const { data, isSessionReady } = useSession();
  const isGranted =
    to.length > 0 ? to.find((role) => data.roles?.includes(role)) : true;

  const router = useRouter();
  useEffect(() => {
    if (!asPageWrapper || !isSessionReady) return;
    !isGranted && router.back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPageWrapper, isGranted, isSessionReady]);

  return <>{isGranted ? children : null}</>;
}
