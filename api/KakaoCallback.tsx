"use client";
// 참고자료
// https://stonesy927.tistory.com/232
// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
// https://2dowon.github.io/docs/react/social_login/

// import styles from './KakaoOAuth2RedirectPage.module.css';
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import JwtInterceptors, { baseURL } from "./ApiController";
import { getStorage, setStorage } from "@/util/loginStorage";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tokenState } from "@/recoil/recoilstore";
import { UserLoginResponse } from "@/type/user";

function KakaoOAuth2RedirectPage() {
  const { instance } = JwtInterceptors();
  const router = useRouter();

  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [token, setToken] = useRecoilState(tokenState);
  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  // 2. access Token 요청
  const getToken = async (code: {
    code: string;
    redirectUri: string | undefined;
  }) => {
    // `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`
    try {
      const response: UserLoginResponse = await instance.post(
        `/oauth2/kakao/login`,
        code
      );
      console.log(response);

      return response.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (code) {
      getToken({ code: code, redirectUri: REDIRECT_URI }).then((res) => {
        setStorage("login", "true");
        // console.log(res.data.accessToken);
        setToken(res.data.accessToken);
        setStorage("refresh", res.data.refreshToken);
        setStorage("access", res.data.accessToken);
        setStorage("member", res.data.memberId);
        console.log(token);
        router.push("/main?value=전체");
      });
    }
  }, []);
  return (
    <>
      <div>로그인 처리 중...</div>
    </>
  );
}

export default KakaoOAuth2RedirectPage;
