import { userState } from "@/global-states/user";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { logOutAPI } from "../api/methods/auth";

export const useSession = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState)

  const logout = async () => {
    try {
      await logOutAPI();
      setUser({});
      router.push("/")
    } catch (err) {
      console.log(err);
    }
  }

  return {
    logout,
    isSessionReady: user.id,
    data: user,
    out_office: user.out_office,
    role_rda: user.role_rda
  }
}

export type UseSession = ReturnType<typeof useSession>