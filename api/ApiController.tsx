import { tokenState } from "@/recoil/recoilstore";
import axios from "axios";
import { useRecoilState } from "recoil";
import jwtDecode, { type JwtPayload } from "jwt-decode";
import { logout, refresh } from "@/api/etc";
import { getStorage, isLoginStorage } from "@/util/loginStorage";
import { useState } from "react";
// const PROXY_URL = window.location.hostname === "localhost" ? "" : "/proxy";
// axios.defaults.withCredentials = true;
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const JwtInterceptors = () => {
  const [token, setToken] = useRecoilState(tokenState);
  // const [rftoken, setRftoken] = useState();
  const data: any = getStorage("refresh");

  const instance = axios.create({
    baseURL: `${baseURL}`,
  });
  //액세스토큰 유효성 검사
  const isAccessTokenValid = async () => {
    if (!token) return false;
    const tokenInfo = await jwtDecode<JwtPayload>(token);
    if (tokenInfo.exp && tokenInfo.exp <= Date.now() / 1000) return false;
    return true;
  };

  //토큰 리프레시
  const refreshingToken = async () => {
    try {
      // console.log({ refreshToken: data.replace(/\"/gi, "") });
      const res = await refresh({ refreshToken: data.replace(/\"/gi, "") });
      console.log(token);
      if (res?.status !== 200) {
        throw new Error(`Response status is ${res?.status}`);
      } else {
        console.log(res);
        setToken(res.data.accessToken);
        return res;
      }
    } catch (error) {
      console.error("refreshToken ERROR", error);
    }
  };

  instance.interceptors.request.use(
    async (config) => {
      const tokenValid = await isAccessTokenValid();
      const isLogin = isLoginStorage();
      if (!isLogin) {
        config.headers["Content-Type"] = "application/json";
      } else if (isLogin && !tokenValid) {
        const result = await refreshingToken();
        console.log(result);
        if (!result) {
          alert("로그인 시간이 만료되었습니다\n다시 로그인 해주세요");
          await logout();
        }
        config.headers["Authorization"] = result?.data.AccessToken;
      } else {
        config.headers["Authorization"] = token;
      }
      console.log(token);
      console.log(config.headers.Authorization);
      return config;
    },
    function (error) {
      alert("해당 요청이 정상적으로 이루어지지 않았어요.\n 다시 시도해주세요.");
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      if (error.response.status === 502) {
        location.href = "/502";
      }
      return Promise.reject(error);
    }
  );

  return { instance };
};

export default JwtInterceptors;
