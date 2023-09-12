// if (typeof window!== 'undefined'){
//   const storage = localStorage;
// }

// 넥스트 전용 로컬스토리지

// const localstorageLoading = () =>{
//   if (typeof window!== 'undefined'){
//       return
//   }
// }
//로그인에 관련된 곳
export const isLoginStorage = () => {
  if (typeof window !== "undefined") {
    const state = localStorage.login;
    return !!state;
  }
  // return true;
};

export const getStorage  = (key: string, defaultValue = undefined) => {
  if (typeof window !== "undefined") {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue || defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  }
};

export const setStorage = (key: string, value: string | [string, unknown]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }
};

// 로그아웃 시
export const removeStorage = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }
};
