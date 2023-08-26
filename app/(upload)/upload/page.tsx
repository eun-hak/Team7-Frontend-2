"use client";
import styled from "@emotion/styled";
import UploadHeader from "@/components/upload_header";

const Upload = () => {
  return (
    <MainPageWrapper>
      <MainPageContainer>
        <UploadHeader></UploadHeader>
      </MainPageContainer>
    </MainPageWrapper>
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
