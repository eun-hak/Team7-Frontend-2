"use client";
import { MainFeed2 } from "@/type/feedtype";
// import { MainFeed } from "@/type/feedtype";
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import CustomAudio from "../audio3";
import { css, keyframes } from "@emotion/react";
import { usePathname, useRouter } from "next/navigation";
import Modal from "../modal";
import ModalForm from "../modalform";
import { getStorage, setStorage } from "@/util/loginStorage";
import Interection from "@/api/Interection";
import { useQuery } from "@tanstack/react-query";
// { data }: { data: MainFeed }

// 노래제목 : data.musicName
// 노래가수 : data.musicianName
// 빌런유형 : data.feedType
// 닉네임   : data.ownerName
// 조회수   : data.viewCount
// 생성일   : data.createdAt
// 박수     : 아직 안만들어짐
const FeedContainer = ({ data }: any) => {
  const { Interection_click } = Interection();
  // const Interection_id = data.feedId;

  const router = useRouter();
  const [modalData, setModalData] = useState<any>([]);
  const path = usePathname();
  const memberId = getStorage("member")?.replace(/\"/gi, "");
  const parts = path.split("/"); // 경로를 '/' 문자로 분리
  const lastPart = parts[parts.length - 1]; // 마지막 부분을 가져오기
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const colorChange = useRef();
  // console.log(data);
  const [clicked, setClicked] = useState(false);
  const handleButtonClick = () => {
    setClicked(!clicked);
  };
  return (
    <>
      {data &&
        data?.map((data: any) => {
          return (
            <FeedBox key={data.feedId}>
              <BoxWrap>
                <BoxWrap2>
                  <WordWrap>
                    {data.musicName} - {data.musicianName}
                  </WordWrap>
                  <VillanType>#{data.feedType}</VillanType>
                </BoxWrap2>
                {lastPart === "mysong" ? (
                  <>
                    <ModifyFlex>
                      <ModifyWrap
                        onClick={() => {
                          router.push("/reupload");
                          setStorage("modify", data.feedId);
                          setModalData([data.musicName, data.musicianName]);
                        }}
                      >
                        수정
                      </ModifyWrap>
                      <DeleteWrap
                        onClick={() => {
                          setModalIsOpen(true);
                          setStorage("delete", data.feedId);
                          setModalData([data.musicName, data.musicianName]);
                        }}
                      >
                        삭제
                      </DeleteWrap>
                    </ModifyFlex>
                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={() => setModalIsOpen(false)}
                    >
                      <ModalForm
                        setModalIsOpen={setModalIsOpen}
                        musicname={modalData[0]}
                        musician={modalData[1]}
                      ></ModalForm>
                      {/* <ModalForm></ModalForm> */}
                    </Modal>
                  </>
                ) : (
                  <ClapWrapper
                    onClick={() => {
                      handleButtonClick();
                      Interection_click({
                        feedId: data.feedId,
                        memberId: memberId,
                      });
                    }}
                    clicked={false}
                  >
                    👏
                  </ClapWrapper>
                )}
              </BoxWrap>
              <CustomAudio></CustomAudio>
              <NickName>닉네임 : {data.ownerName}</NickName>
              <WordBottomWrap>
                {data.createdAt}-{data.viewCount} -{data.interactionCount} 번
              </WordBottomWrap>
            </FeedBox>
          );
        })}
    </>
  );
};

export default FeedContainer;

const ModifyFlex = styled.div`
  max-width: 200px;
  display: flex;
`;
const ModifyWrap = styled.div`
  margin-right: 16px;
  margin-top: 13px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`;
const DeleteWrap = styled.div`
  margin-right: 16px;
  margin-top: 13px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
`;
const NickName = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 10px;
  margin-top: 10px;
`;
const FeedBox = styled.div`
  width: 327px;
  height: 188px;
  border-radius: 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer, Edge */
  ::-webkit-scrollbar {
    width: 0.5em; /* Chrome, Safari, Opera */
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BoxWrap2 = styled.div`
  display: flex;
  flex-direction: column;
`;
//노래제목 / 빌런 사이 간격
const WordWrap = styled.div`
  max-width: 150px;
  display: block;
  font-size: 16px;
  margin: 10px 10px 2px 10px;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 700;
`;
const VillanType = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  display: block;
  margin-left: 10px;
  margin-bottom: 6px;
`;
const WordBottomWrap = styled.div`
  display: flex;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 10px;
`;

// 박수 클릭 애니메이션  => 작동안됨
const pingAnimation = (props: { clicked: boolean }) =>
  props.clicked &&
  css`
    animation: ${pingKeyframes} 1s infinite;
  `;

const pingKeyframes = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.2;
  }
`;

const ClapWrapper = styled.div<{ clicked: boolean }>`
  border-radius: 8px;
  border: 2px solid #651fff;
  width: 60px;
  height: 34px;
  flex-shrink: 0;
  text-align: center;
  font-size: 20px;
  margin: 10px;
  &:hover {
    cursor: pointer;
    background-color: #651fff;
  }
  &:active {
    content: "박수";
    cursor: pointer;
    background-color: blue;
  }

  ${pingAnimation};
`;
