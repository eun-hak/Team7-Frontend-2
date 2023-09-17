"use client";
import styled from "@emotion/styled";
import UploadHeader from "@/components/upload_header";
import MediaFileDownload from "@/components/mediafiledownload";
import MusicUploadForm from "@/components/musicUploadForm";
import { FormProvider, useForm } from "react-hook-form";
// import { CustomAudio } from "@/components/audio";
// import CustomAudioPlayer from "@/components/audio2";
import CustomAudio from "@/components/audio3";

const Upload = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <MainPageWrapper>
        <MainPageContainer>
          <UploadHeader name="노래 수정" type="a"></UploadHeader>
          <MusicUploadForm></MusicUploadForm>
          <MediaFileDownload />
          <UploadBox>
            <CustomAudio></CustomAudio>
          </UploadBox>
        </MainPageContainer>
      </MainPageWrapper>
    </FormProvider>
  );
};

export default Upload;

const UploadBox = styled.div`
  width: 377px;

  margin-top: 15px;
  margin-left: 140px;
`;
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
