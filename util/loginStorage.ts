const storage = localStorage;

//로그인에 관련된 곳
export const isLoginStorage = () => {
  const state = localStorage.login;
  return !!state;
  // return true;
};

export const getStorage = (key: string, defaultValue = undefined) => {
  try {
    const storedValue = storage.getItem(key);
    return storedValue || defaultValue;
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const setStorage = (key: string, value: string | [string, unknown]) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

// 로그아웃 시
export const removeStorage = (key: string) => {
  try {
    storage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
