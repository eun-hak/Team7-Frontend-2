"use client";
import styled from "@emotion/styled";
import UploadHeader from "@/components/upload_header";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { tokenState } from "@/recoil/recoilstore";
import Reactquery from "@/util/reactquery";
import FeedData from "@/components/feed/feedData";
const MyClapPage = () => {
  const methods = useForm();
  const { myclapfeed } = Reactquery();
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    console.log(token);
  }, []);
  return (
    <FormProvider {...methods}>
      <MainPageWrapper>
        <MainPageContainer>
          <UploadHeader name="박수 친 노래" type="hidden"></UploadHeader>
          <FeedWrap>
            <FeedData data={myclapfeed}></FeedData>
          </FeedWrap>
        </MainPageContainer>
      </MainPageWrapper>
    </FormProvider>
  );
};

export default MyClapPage;

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
