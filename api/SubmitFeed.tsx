"use client";
import axios from "axios";
import JwtInterceptors, { baseURL } from "./ApiController";
import { getStorage } from "@/util/loginStorage";
import { useRecoilValue } from "recoil";
import { tokenState } from "@/recoil/recoilstore";

const SubmitFeed = () => {
  const { instance } = JwtInterceptors();
  const token1 = useRecoilValue(tokenState);
  const token3 = `Bearer ${token1}`;
  const submit = async (formdata: { code: object }) => {
    const token: any = getStorage("access");
    const token2 = `Bearer ${token.replace(/\"/gi, "")}`;
    try {
      const response = await instance.post(`/feeds`, formdata);
      // const response = await axios.post(`${baseURL}feeds`, formdata, {
      //   headers: {
      //     Authorization: token2,
      //   },
      // });
      console.log(response);
      console.log(token3);
      console.log(token2);
      return response.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  return { submit };
};

export default SubmitFeed;
