import { tokenState } from "@/recoil/recoilstore";
import axios from "axios";
import { useRecoilState } from "recoil";

// const PROXY_URL = window.location.hostname === "localhost" ? "" : "/proxy";
// axios.defaults.withCredentials = true;
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const JwtInterceptors = () => {
  const [token, setToken] = useRecoilState(tokenState);

  const instance = axios.create({
    baseURL: `${baseURL}`,
  });
  return { instance };
};




export default JwtInterceptors;



