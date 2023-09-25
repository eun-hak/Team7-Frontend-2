import JwtInterceptors from "@/api/ApiController";
import { getStorage, removeStorage } from "@/util/loginStorage";
import { AxiosError } from "axios";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseURL } from "@/api/ApiController";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tokenState } from "@/recoil/recoilstore";
import { getTsBuildInfoEmitOutputFilePath } from "typescript";
// 리프레시

const ETC = () => {
  // const [token, setToken] = useRecoilState(tokenState);
  const refresh = async (refreshToken: { refreshToken?: string }) => {
    try {
      const res = await axios.post(`${baseURL}token/refresh`, refreshToken);
      // console.log(res);
      return res;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
  };

  // 로그아웃
  const logout = async (onSuccessCallback?: () => void) => {
    // const { instance } = JwtInterceptors();

    const a = 1;
    const token: any = getStorage("access");
    const token2 = `Bearer ${token.replace(/\"/gi, "")}`;
    const memberId = getStorage("member")?.replace(/\"/gi, "");
    try {
      // console.log(token);
      // console.log(token2);

      const { data } = await axios.post(
        `${baseURL}oauth2/kakao/logout?memberId=${memberId}`,
        undefined
      );
      console.log(data);
      if (data == "Logged out successfully") {
        removeStorage("login");
        removeStorage("refresh");
        removeStorage("access");
        console.log("로그아웃 성공");

        // alert("로그아웃에 성공하였습니다");
        if (onSuccessCallback) {
          onSuccessCallback();
        }

        // const router = useRouter();
        // router.push("/main");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);

      // alert("로그아웃에 실패했습니다");
    }
  };
  return { refresh, logout };
};
export default ETC;
