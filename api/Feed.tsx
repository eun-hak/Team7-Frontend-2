import axios, { AxiosError } from "axios";
import JwtInterceptors, { baseURL } from "./ApiController";
// import { Feed } from "@/type/feedtype";
import { MainFeed2 } from "@/type/feedtype";
import { getStorage } from "@/util/loginStorage";

const Feed = () => {
  const { instance } = JwtInterceptors();

  //전체 피드
  const all = async (value = "전체") => {
    try {
      const data: MainFeed2 = await instance.get(
        `/feeds/feedType?value=${value}`
      );
      // console.log(data.data.data);
      // console.log(baseURL);
      return data.data.data;
      // return data
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
  };

  //내가 만든 피드
  const myfeed = async (id: string | undefined) => {
    try {
      const data: MainFeed2 = await instance.get(`/feeds/member?id=${id}`);
      // console.log(data.data.data);
      // console.log(baseURL);
      return data.data.data;
      // return data
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
  };
  //피드 수정
  const modifyfeed = async (formdata: { code: object }) => {
    const token: any = getStorage("access");
    const token2 = `Bearer ${token.replace(/\"/gi, "")}`;
    try {
      const response: MainFeed2 = await axios.put(`${baseURL}feeds`, formdata, {
        headers: {
          Authorization: token2,
        },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  return { all, myfeed, modifyfeed };
};

export default Feed;
