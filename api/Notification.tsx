import axios from "axios";
import JwtInterceptors, { baseURL } from "./ApiController";
import { getStorage } from "@/util/loginStorage";

interface Click_Type {
  feedId?: string;
  memberId?: string;
}
const Notification = () => {
  const { instance } = JwtInterceptors();

  const notification_get = async () => {
    const token: any = getStorage("access");
    const token2 = `Bearer ${token?.replace(/\"/gi, "")}`;
    const memberId = getStorage("member")?.replace(/\"/gi, "");
    try {
      const response = await axios.get(
        `${baseURL}notifications?memberId=${memberId}`,
        {
          headers: { Authorization: `Bearer ${token2}` },
        }
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
      const response = await axios.post(
        `${baseURL}notifications/read?notificationId=${notificationId}`,
        undefined,
        {
          headers: { Authorization: `Bearer ${token2}` },
        }
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
