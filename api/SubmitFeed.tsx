"use client";
import JwtInterceptors from "./ApiController";
import { SubmitData } from "@/type/feedtype";

const SubmitFeed = () => {
  const { instance } = JwtInterceptors();
  const submit = async (formdata: { code: object }) => {
    try {
      const response: SubmitData = await instance.post(`/feeds`, formdata);
      return response.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  return { submit };
};

export default SubmitFeed;
