import axios from "axios";
import JwtInterceptors, { baseURL } from "./ApiController";
import { getStorage, isLoginStorage } from "@/util/loginStorage";

interface Click_Type {
  feedId?: string;
  memberId?: string;
}
const Interection = () => {
  //Interaction 수행

  const Interection_click = async (data: Click_Type) => {
    const token: any = getStorage("access");
    const token2 = `Bearer ${token?.replace(/\"/gi, "")}`;
    try {
      const response = await axios.post(`${baseURL}interactions`, data, {
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

  const Interection_check = async () => {
    const token: any = getStorage("access");
    const token2 = `Bearer ${token?.replace(/\"/gi, "")}`;
    const memberId = getStorage("member")?.replace(/\"/gi, "");
    const isLogin = isLoginStorage();

    try {
      const response = await axios.get(
        `${baseURL}feeds/interactionFeeds?memberId=${memberId}`,
        {
          headers: {
            Authorization: token2,
          },
        }
      );
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  return { Interection_click, Interection_check };
};

export default Interection;
