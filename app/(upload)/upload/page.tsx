"use client";
import styled from "@emotion/styled";
import UploadHeader from "@/components/upload_header";
import MediaFileDownload from "@/components/mediafiledownload";
import MusicUploadForm from "@/components/musicUploadForm";
import { FormProvider, useForm } from "react-hook-form";
const Upload = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <MainPageWrapper>
        <MainPageContainer>
          <UploadHeader></UploadHeader>
          <MusicUploadForm></MusicUploadForm>
          <MediaFileDownload />
        </MainPageContainer>
      </MainPageWrapper>
    </FormProvider>
  );
};

export default Upload;

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
`;
