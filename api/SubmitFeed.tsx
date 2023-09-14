import axios from "axios";
import JwtInterceptors, { baseURL } from "./ApiController";
import { getStorage } from "@/util/loginStorage";

const SubmitFeed = () => {
  //   const { instance } = JwtInterceptors();

  const submit = async (formdata: { code: object }) => {
    const token: any = getStorage("access");
    const token2 = `Bearer ${token.replace(/\"/gi, "")}`;
    try {
      const response = await axios.post(`${baseURL}feeds`, formdata, {
        headers: {
          Authorization: token2,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  return { submit };
};

export default SubmitFeed;
