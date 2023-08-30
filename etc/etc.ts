import { removeStorage } from "@/util/loginStorage";
import { AxiosError } from "axios";
import axios from "axios";
// 리프레시
export const refresh = () => {
  try {
    const res = axios.post(`/user/client-refresh`);
    return res;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(axiosError.message);
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const { data } = await axios.post(`/user/client-logout`);
    if (data.Success) {
      removeStorage("login");
      window.location.href = "/";
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(axiosError.message);
  }
};
