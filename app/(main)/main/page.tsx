"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import styled from "@emotion/styled";
import { useRouter, useSearchParams } from "next/navigation";
import Feed from "@/api/Feed";
import Body from "@/components/body";
import FeedContainer from "@/components/feed/feedContainer";
import Image from "next/image";
// import { fakeLectureList } from "@/constant/placeholderData";
import { css, keyframes } from "@emotion/react";
import Category from "@/components/category";
import { useState } from "react";
import CustomAudio from "@/components/audio3";

interface BackgroundImages {
  [key: string]: string;
}

const backgroundImages: BackgroundImages = {
  전체: "/background-all.svg",
  고음괴물: "/background-1.svg",
  화음귀신: "/background-2.svg",
  힙합전사: "/background-3.svg",
  하이라이트도둑: "/background-4.svg",
  소몰이대장: "/background-5.svg",
  삑사리요정: "/background-6.svg",
  기타: "/background-all.svg",
};
const Main = () => {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(!clicked);
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("value") || "";

  // console.log(typeof searchValue);
  const { all } = Body();
  // const Data = JSON.stringify(data);
  // const a = data[0].musicName

  return (
    <MainPageWrapper background={backgroundImages[searchValue]}>
      <Header />
      <CategoryWrapper>
        <Category />
      </CategoryWrapper>
      <MainPageContainer>
        <FeedWrap>
          <FeedContainer data={all}></FeedContainer>
        </FeedWrap>

        <Footer />
      </MainPageContainer>
    </MainPageWrapper>
  );
};

export default Main;

const NickName = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 10px;
  margin-top: 10px;
`;
const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const FeedWrap = styled.div`
  margin-top: 80px;
  overflow-y: scroll; /* This hides horizontal scroll */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer, Edge */
  ::-webkit-scrollbar {
    width: 0.5em; /* Chrome, Safari, Opera */
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  /* @media (max-height: 968px) {
    height: 500px;
  } */
`;

const FeedBox = styled.div`
  width: 327px;
  height: 188px;
  border-radius: 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
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

  ${pingAnimation};
`;

////
const MainPageWrapper = styled.div<{ background: string }>`
  width: 100%;
  /* position: flex; */
  top: 0;
  bottom: 0;
  height: 100vh;
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  /* background-size: contain; */
  background-position: center;
  background-size: auto;
`;

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 186px);
  align-items: center;
`;
