import { userState } from "@/global-states/user";
import { checkSessionAPI } from "@/libs/api/methods/auth";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const routes = ["/", "/reset-password"];

function useCheckSession({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (!router.isReady) return;

    const checkSession = async () => {
      const pathname = router.asPath.replace(/(\?.*|#.*)/g, "");

      try {
        const session = await checkSessionAPI();
        setUser(session.response);
        routes.includes(pathname) && router.push("/dashboard");
      } catch (err) {
        setUser({});
        !routes.includes(pathname) && router.push("/");
      }
    };
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Component, router.asPath, router.isReady]);
}

export default function CheckSession(appProps: AppProps) {
  useCheckSession(appProps);
  return <></>;
}
