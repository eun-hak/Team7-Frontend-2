export interface UserLoginResponse {
  data: {
    data: {
      accessToken: string;
      refreshToken: string;
      memberId: string;
    };
  };
}

export interface AxiosResponseSuccess {
  success: boolean;
}

export interface UserNickNameChange {
  data: {
    data: string;
    message?: string;
  };
}
