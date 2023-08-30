import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from "recoil";
const MediaFileDownload = () => {
  const [selectedFile, setSelectedFile] = useState<string | undefined>("null");
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
    // const fileList = e.target.files;
    // const length = fileList?.length;
    // const [imageFile, setImageFile] = useState(null);
    const { files }: any = e.target;
    // 파일 첨부 도중에 취소를 누를 경우 에러가 발생하지 않도록 return 처리
    if (files.length <= 0) {
      return;
    }
    const file = files[0];
    // file 객체에서 타입 확인
    const fileType = file.type;
    if (!fileType.includes("m4a")) {
      alert(
        `해당 파일은 이미지 파일이 아닙니다.\n이미지(JPG,JPEG,GIF,PNG)나 PDF 파일을 업로드 해주세요.`
      );
      e.target.value = "";

      return;
    }
    // if (fileList && fileList[0]) {
    //   const url = URL.createObjectURL(fileList[0]);
    //   //   setImageFile({
    //   //     file: fileList[0],
    //   //     thumbnail: url,
    //   //     type: fileList[0].type.slice(0, 5),
    //   //   });
    // }
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
        </FileUploadButton>
      */}
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
