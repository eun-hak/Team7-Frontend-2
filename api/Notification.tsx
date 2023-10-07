import axios from "axios";
import JwtInterceptors, { baseURL } from "./ApiController";
import { getStorage } from "@/util/loginStorage";

interface Click_Type {
  feedId?: string;
  memberId?: string;
}
const Notification = () => {
  //Interaction 수행
  const { instance } = JwtInterceptors();

  const notification_get = async () => {
    const token: any = getStorage("access");
    const token2 = `Bearer ${token?.replace(/\"/gi, "")}`;
    const memberId = getStorage("member")?.replace(/\"/gi, "");
    try {
      const response = await instance.get(
        `/notifications?memberId=${memberId}`
      );
      // console.log(response);
      return response.data.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };
  //Notification 읽기
  const notification_read = async (notificationId: string) => {
    const token: any = getStorage("access");
    const token2 = `Bearer ${token?.replace(/\"/gi, "")}`;
    const memberId = getStorage("member")?.replace(/\"/gi, "");
    try {
      const response = await instance.post(
        `/notifications/read?notificationId=${notificationId}`,
        undefined
      );
      // console.log(response);
      return response;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  return { notification_get, notification_read };
};

export default Notification;
