"use client";
import styled from "@emotion/styled";
import UploadHeader from "@/components/upload_header";
// import { logout } from "@/api/etc";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { tokenState } from "@/recoil/recoilstore";
import FeedContainer from "@/components/feed/feedContainer";
import Body from "@/components/body";

const Mypage = () => {
  const methods = useForm();
  const { myfeed } = Body();
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    console.log(token);
  }, []);
  return (
    <FormProvider {...methods}>
      <MainPageWrapper>
        <MainPageContainer>
          <UploadHeader name="내 노래" type="hidden"></UploadHeader>
          <FeedWrap>
            <FeedContainer data={myfeed}></FeedContainer>
          </FeedWrap>
        </MainPageContainer>
      </MainPageWrapper>
    </FormProvider>
  );
};

export default Mypage;

const MainPageWrapper = styled.div`
  width: 100%;
  /* position: flex; */
  top: 0;
  bottom: 0;
  height: 100vh;
`;

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 117px);
  align-items: center;
  /* justify-content: center; */
`;

const FeedWrap = styled.div`
  overflow-y: scroll;
  /* This hides horizontal scroll */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer, Edge */
  ::-webkit-scrollbar {
    width: 0.5em; /* Chrome, Safari, Opera */
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;
