"use client";
import { MainFeed2 } from "@/type/feedtype";
// import { MainFeed } from "@/type/feedtype";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import CustomAudio from "../audio3";
import { css, keyframes } from "@emotion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Modal from "../modal";
import ModalForm from "../modalform";
import { getStorage, setStorage } from "@/util/loginStorage";
import Interection from "@/api/Interection";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Feed from "@/api/Feed";
import Body from "../body";
// { data }: { data: MainFeed }

// 노래제목 : data.musicName
// 노래가수 : data.musicianName
// 빌런유형 : data.feedType
// 닉네임   : data.ownerName
// 조회수   : data.viewCount
// 생성일   : data.createdAt
// 박수     : 아직 안만들어짐
const FeedContainer = ({ data }: any) => {
  const feed = Feed();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("value") || "";
  const { refetch } = useQuery(
    ["feed", searchValue],
    () => feed.all(searchValue),
    {}
  );
  // // 쿼리 다시 불러오기 함수
  // const refetchQuery = (newRefetchCacheValue: any) => {
  //   // refetchcache 값을 변경하여 키를 업데이트
  //   const updatedQueryKey = ["feed", searchValue, newRefetchCacheValue];

  //   // 쿼리를 다시 불러옴
  //   queryClient.invalidateQueries(updatedQueryKey);
  // };

  // refetchcache 값을 바꿀 때 호출

  const { Interection_click, Interection_check } = Interection();
  // const Interection_id = data.feedId;
  const { myclapfeed, myfeed } = Body();
  const router = useRouter();
  const [modalData, setModalData] = useState<any>([]);
  const path = usePathname();
  const memberId = getStorage("member")?.replace(/\"/gi, "");
  const parts = path.split("/"); // 경로를 '/' 문자로 분리
  const lastPart = parts[parts.length - 1]; // 마지막 부분을 가져오기
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const colorChange = useRef();
  // console.log(data);
  const My_Calp_data =
    data &&
    myclapfeed.map((data: any) => {
      return data.feedId;
    });
  const [clicked, setClicked] = useState<boolean>(false);

  const handleButtonClick = () => {
    setClicked(!clicked);
  };
  console.log(My_Calp_data);
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
                ) : My_Calp_data.includes(data.feedId) ? (
                  <ClapWrapper
                    onClick={async () => {
                      queryClient.invalidateQueries(["myclapfeed"]);
                      refetch();
                      handleButtonClick();
                      await Interection_click({
                        feedId: data.feedId,
                        memberId: memberId,
                      });
                    }}
                    clicked={false}
                    border="2px solid #651fff;"
                  >
                    👏
                  </ClapWrapper>
                ) : (
                  <ClapWrapper
                    onClick={async () => {
                      queryClient.invalidateQueries(["myclapfeed"]);
                      refetch();
                      handleButtonClick();
                      await Interection_click({
                        feedId: data.feedId,
                        memberId: memberId,
                      });
                    }}
                    clicked={false}
                    BackgroundColor={"#EAED70"}
                    fontsize="14px"
                  >
                    박수
                  </ClapWrapper>
                )}
              </BoxWrap>
              <CustomAudio></CustomAudio>
              <NickName>닉네임 : {data.ownerName}</NickName>
              <WordBottomWrap>
                {data.createdAt}
                <div>
                  <img
                    src="/play-arrow.png"
                    alt="Play"
                    width="17px"
                    height="17px"
                  />
                </div>
                <div>{data.viewCount}</div>
                박수
                {data.interactionCount} 번
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
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.6);
  margin-left: 10px;
`;

const ClapWrapper = styled.div<{
  clicked: boolean;
  BackgroundColor?: any;
  border?: string;
  fontsize?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  /* border: 2px solid #651fff; */
  border: ${(props) => props.border || "none"};
  font-size: ${(props) => props.fontsize || "20px"};
  width: 60px;
  height: 34px;
  flex-shrink: 0;
  text-align: center;

  /* font-size: 20px; */
  margin: 10px;
  background-color: ${(props) =>
    props.BackgroundColor || "transparent"}; /* 기본값은 투명으로 설정 */
  &:hover {
    cursor: pointer;
    background-color: #651fff;
  }
`;
