"use client";
import { getStorage, removeStorage } from "@/util/loginStorage";
import { AxiosError } from "axios";
import axios from "axios";
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
    const memberId = getStorage("member")?.replace(/\"/gi, "");
    try {
      const { data } = await axios.post(
        `${baseURL}oauth2/kakao/logout?memberId=${memberId}`,
        undefined
      );
      if (data == "Logged out successfully") {
        removeStorage("login");
        removeStorage("refresh");
        removeStorage("access");
        if (onSuccessCallback) {
          onSuccessCallback();
        }
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
