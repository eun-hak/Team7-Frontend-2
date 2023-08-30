import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
const MediaFileDownload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };
  type UploadImage = {
    file: File;
    thumbnail: string;
    type: string;
  };
  const uploadProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const length = fileList?.length;
    // const [imageFile, setImageFile] = useState(null);
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);
      //   setImageFile({
      //     file: fileList[0],
      //     thumbnail: url,
      //     type: fileList[0].type.slice(0, 5),
      //   });
    }
  };
  return (
    <FileUploadContainer>
      <FileUploadForm>
        <FileInput
          type="file"
          accept="audio/*"
          ref={fileInputRef}
          onChange={uploadProfile}
        />
        {/* <FileUploadButton type="button" onClick={handleClickFileInput}>
          파일 업로드 버튼
        </FileUploadButton> */}
      </FileUploadForm>
    </FileUploadContainer>
  );
};

export default MediaFileDownload;

const FileUploadContainer = styled.div`
  display: flex;
`;

const FileUploadForm = styled.form`
  display: flex;
`;

const FileInput = styled.input``;

const FileUploadButton = styled.button``;
