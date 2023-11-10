import axios from "axios";
import JwtInterceptors, { baseURL } from "./ApiController";
import { getStorage, isLoginStorage } from "@/util/loginStorage";

interface Click_Type {
  feedId?: string;
  memberId?: string;
}
const Interection = () => {
  //Interaction 수행
  const { instance } = JwtInterceptors();
  const Interection_click = async (data: Click_Type) => {
    const token: any = getStorage("access");
    const token2 = `Bearer ${token?.replace(/\"/gi, "")}`;
    try {
      const response = await instance.post(`/interactions`, data);
      return response.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };
  //사용자가 인터렉션한 모든 피드 정보 가져오기
  const Interection_check = async () => {
    const token: any = getStorage("access");
    const token2 = `Bearer ${token?.replace(/\"/gi, "")}`;
    const memberId = getStorage("member")?.replace(/\"/gi, "");
    const isLogin = isLoginStorage();
    try {
      const response = await axios.get(
        `${baseURL}feeds/interactionFeeds?memberId=${memberId}`,
        {
          headers: { Authorization: `Bearer ${token2}` },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  const Interection_plus = async (feedId: string) => {
    const token: any = getStorage("access");
    const token2 = `Bearer ${token?.replace(/\"/gi, "")}`;
    const memberId = getStorage("member")?.replace(/\"/gi, "");
    const isLogin = isLoginStorage();

    try {
      const response = await axios.post(
        `${baseURL}feeds/viewFeed?id=${feedId}`,
        undefined,
        {
          headers: { Authorization: `Bearer ${token2}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  return { Interection_click, Interection_check, Interection_plus };
};

export default Interection;
