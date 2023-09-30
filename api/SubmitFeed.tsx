"use client";
import axios from "axios";
import JwtInterceptors, { baseURL } from "./ApiController";
import { getStorage } from "@/util/loginStorage";
import { useRecoilValue } from "recoil";
import { tokenState } from "@/recoil/recoilstore";
import { SubmitData } from "@/type/feedtype";

const SubmitFeed = () => {
  const { instance } = JwtInterceptors();
  const submit = async (formdata: { code: object }) => {
    try {
      const response: SubmitData = await instance.post(`/feeds`, formdata);
      // console.log(response);
      // console.log(token3);
      // console.log(token2);
      return response.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  return { submit };
};

export default SubmitFeed;
