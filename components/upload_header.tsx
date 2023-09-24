"use client";
import styled from "@emotion/styled";
import Notification from "@/public/notification.svg";
import Link from "next/link";
import BackIcon from "@/public/chevron-left.svg";
import { usePathname } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { getStorage, setStorage } from "@/util/loginStorage";
import JwtInterceptors from "@/api/ApiController";
import SubmitFeed from "@/api/SubmitFeed";
import { useRouter } from "next/navigation";
import ReName from "@/api/Rename";
import Feed from "@/api/Feed";
import { useState } from "react";
import Modal from "./modal";
import ModalForm from "./modalform";
interface propsType {
  name: string;
  type: string;
}
const UploadHeader = (props: propsType) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const parts = path.split("/"); // 경로를 '/' 문자로 분리
  const lastPart = parts[parts.length - 1]; // 마지막 부분을 가져오기
  const { rename } = ReName();
  const { submit } = SubmitFeed();
  const { modifyfeed } = Feed();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useFormContext();

  const onSubmitWithdraw = (data: any) => {
    console.log(data);
    // setStorage("withdraw", data.withdrawTitle)
  };
  const member = getStorage("member")?.replace(/\"/gi, "");
  const formDataToSend: any = new FormData();
  const onSubmitUpload = (data: any) => {
    formDataToSend.append("ownerId", getStorage("member")?.replace(/\"/gi, ""));
    formDataToSend.append("musicName", data.songTitle);
    formDataToSend.append("musicianName", data.artist);
    formDataToSend.append("feedType", data.villainType);
    formDataToSend.append("description", data.description);
    formDataToSend.append("recordDuration", 500);
    formDataToSend.append("recordFile", data.audio[0]);
    submit(formDataToSend);
    alert("등록되었습니다");
    window.location.reload();
  };

  const onSubmitReUpload = (data: any) => {
    formDataToSend?.append("musicName", data.songTitle);
    formDataToSend?.append("musicianName", data.artist);
    formDataToSend?.append("feedId", getStorage("modify")?.replace(/\"/gi, ""));
    formDataToSend?.append("feedType", data.villainType);
    formDataToSend?.append("description", data.description);
    formDataToSend?.append("recordFile", data.audio[0]);
    modifyfeed(formDataToSend);
    alert("수정되었습니다");
    router.push("/mysong");
  };
  const onSubmitRename = (data: any) => {
    rename(data.rename);
  };
  return (
    <HeaderWrapper>
      <div>
        <HeaderTop>
          {lastPart === "mysong" ? (
            <Link href="/mypage">
              <LogoLink>
                <BackIcon width={55} height={24} />
              </LogoLink>
            </Link>
          ) : lastPart === "rename" ? (
            <Link href="/mypage">
              <LogoLink>
                <BackIcon width={55} height={24} />
              </LogoLink>
            </Link>
          ) : lastPart === "mysong" ? (
            <Link href="/mypage">
              <LogoLink>
                <BackIcon width={55} height={24} />
              </LogoLink>
            </Link>
          ) : lastPart === "myclapsong" ? (
            <Link href="/mypage">
              <LogoLink>
                <BackIcon width={55} height={24} />
              </LogoLink>
            </Link>
          ) : (
            <Link href="/main?value=전체">
              <LogoLink>
                <BackIcon width={55} height={24} />
              </LogoLink>
            </Link>
          )}

          <WordWrap color="rgba(0, 0, 0, 0.87);">{props.name}</WordWrap>
          {lastPart === "upload" ? (
            <ButtonForm onSubmit={handleSubmit(onSubmitUpload)}>
              <ButtonWrap
                type="submit"
                disabled={isSubmitting}
                color="rgba(0, 0, 0, 0.38);"
                visibility={props.type}
              >
                올리기
              </ButtonWrap>
            </ButtonForm>
          ) : lastPart === "rename" ? (
            <ButtonForm onSubmit={handleSubmit(onSubmitRename)}>
              <ButtonWrap
                type="submit"
                disabled={isSubmitting}
                color="rgba(0, 0, 0, 0.38);"
                visibility={props.type}
              >
                완료
              </ButtonWrap>
            </ButtonForm>
          ) : lastPart === "reupload" ? (
            <ButtonForm onSubmit={handleSubmit(onSubmitReUpload)}>
              <ButtonWrap
                type="submit"
                disabled={isSubmitting}
                color="rgba(0, 0, 0, 0.38);"
                visibility={props.type}
              >
                완료
              </ButtonWrap>
            </ButtonForm>
          ) : lastPart === "withdraw" ? (
            <ButtonForm onSubmit={handleSubmit(onSubmitWithdraw)}>
              <ButtonWrap
                type="submit"
                disabled={isSubmitting}
                color="rgba(0, 0, 0, 0.38);"
                visibility={props.type}
                onClick={() => {
                  setModalIsOpen(true);
                }}
              >
                제출2
              </ButtonWrap>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
              >
                <ModalForm setModalIsOpen={setModalIsOpen}></ModalForm>
                {/* <ModalForm></ModalForm> */}
              </Modal>
            </ButtonForm>
          ) : (
            <ButtonForm onSubmit={handleSubmit(onSubmitRename)}>
              <ButtonWrap
                type="submit"
                disabled={isSubmitting}
                color="rgba(0, 0, 0, 0.38);"
                visibility={props.type}
              >
                올리기
              </ButtonWrap>
            </ButtonForm>
          )}
        </HeaderTop>
      </div>

      <WhiteBackground />
    </HeaderWrapper>
  );
};

export default UploadHeader;

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: white;
  z-index: 20;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  /* margin: 0 20px; */
  border-bottom: 1px solid #e2e8f0;
`;

const LogoLink = styled.div`
  margin-left: 20px;
  cursor: pointer;
`;

const WordWrap = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-right: 20px;
`;

const ButtonForm = styled.form``;
const ButtonWrap = styled.button<{ color: string; visibility: string }>`
  background-color: white;
  border: none;
  color: ${(props) => props.color};
  visibility: ${(props) => props.visibility};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-right: 20px;
  cursor: pointer;
`;

const WhiteBackground = styled.div`
  height: 115px;
  background-color: white;
  position: absolute;
  top: 0;
`;
