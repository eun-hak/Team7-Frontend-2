import axios from "axios";
import JwtInterceptors, { baseURL } from "./ApiController";
import { getStorage } from "@/util/loginStorage";
import { usePathname, useRouter } from "next/navigation";
import { UserNickNameChange } from "@/type/user";

const ReName = () => {
  const { instance } = JwtInterceptors();
  const path = usePathname();
  const router = useRouter();
  const memberId = getStorage("member")?.replace(/\"/gi, "");
  const rename = async (data: string) => {
    try {
      const response: UserNickNameChange = await instance.post(
        `/members/${memberId}?name=${data}`,
        undefined
      );

      console.log(response);
      alert("닉네임 수정이 완료되었습니다");
      router.push("/main?value=전체");
      return response.data;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw error;
    }
  };

  return { rename };
};

export default ReName;
