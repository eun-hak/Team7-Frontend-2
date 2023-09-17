"use client";
import styled from "@emotion/styled";
import UploadHeader from "@/components/upload_header";
// import { logout } from "@/api/etc";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { tokenState } from "@/recoil/recoilstore";
import FrontIcon from "@/public/chevron-right.svg";
import RenameForm from "@/components/renameForm";

const Mypage = () => {
  const methods = useForm();
  const [token, setToken] = useRecoilState(tokenState);
  useEffect(() => {
    console.log(token);
  }, []);
  return (
    <FormProvider {...methods}>
      <MainPageWrapper>
        <MainPageContainer>
          <UploadHeader name="탈퇴" type="a"></UploadHeader>
        </MainPageContainer>
      </MainPageWrapper>
    </FormProvider>
  );
};

export default Mypage;

const MainPageWrapper = styled.div`
  width: 100%;
  position: flex;
  top: 0;
  bottom: 0;
  height: 100%;
`;

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 117px);
  align-items: center;
  justify-content: center;
`;

const LogoLink = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  line-height: 4;
  margin-right: 14px;
`;
