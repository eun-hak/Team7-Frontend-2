import JwtInterceptors from "@/api/ApiController";
import { getStorage, removeStorage } from "@/util/loginStorage";
import { AxiosError } from "axios";
import axios from "axios";
import { useRouter } from "next/navigation";
import { baseURL } from "@/api/ApiController";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tokenState } from "@/recoil/recoilstore";
// 리프레시

export const refresh = async (refreshToken: { refreshToken?: string }) => {
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
export const logout = async () => {
  // const { instance } = JwtInterceptors();
  const a = 1;
  const token: any = getStorage("access");
  const token2 = `Bearer ${token.replace(/\"/gi, "")}`;
  try {
    console.log(token2);
    const { data } = await axios.post(`${baseURL}oauth2/kakao/logout`, a, {
      headers: {
        Authorization: token2,
      },
    });
    if (data == "Logged out successfully") {
      removeStorage("login");
      removeStorage("refresh");
      console.log("로그아웃 성공");
      alert("로그아웃에 성공하였습니다");
      // const router = useRouter();
      // router.push("/main");
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(axiosError.message);
  }
};