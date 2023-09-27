import axios from "axios";
import JwtInterceptors, { baseURL } from "./ApiController";
import { getStorage } from "@/util/loginStorage";
import { usePathname, useRouter } from "next/navigation";

const ReName = () => {
  const { instance } = JwtInterceptors();
  const path = usePathname();
  const router = useRouter();
  const parts = path.split("/"); // 경로를 '/' 문자로 분리
  const lastPart = parts[parts.length - 1]; // 마지막 부분을 가져오기
  const memberId = getStorage("member")?.replace(/\"/gi, "");
  const rename = async (data: string) => {
    const token: any = getStorage("access");
    const token2 = `Bearer ${token.replace(/\"/gi, "")}`;
    try {
      const response = await instance.post(
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
