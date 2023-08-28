"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";

import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Feed from "@/api/Feed";
import Body from "@/components/body";
import FeedContainer from "@/components/feed/feedContainer";
import Image from "next/image";
// import { fakeLectureList } from "@/constant/placeholderData";
import Background1 from "@/public/background-1.svg";
import Category from "@/components/category";
//데이터 패칭 부터 다시

const Main = () => {
  const router = useRouter();

  // console.log(router);

  const { data } = Body();
  // const Data = JSON.stringify(data);
  // const a = data[0].musicName

  console.log(data);
  return (
    <MainPageWrapper>
      <Header />

      <CategoryWrapper>
        <Category />
      </CategoryWrapper>
      {/* <Image
          src={"/background-1.svg"}
          width={1800}
          height={700}
          alt="메인 배경 이미지"
          objectFit="cover"
          objectPosition="center"
        /> */}
      {/* <BackgroundWrapper>
        <Background1 />
      </BackgroundWrapper> */}
      <MainPageContainer>
        {/* {data !== undefined ? (
          <FeedContainer data={data}></FeedContainer>
        ) : null} */}
        <FeedWrap>
          {data?.map((data) => {
            return (
              <FeedBox>
                <BoxWrap>
                  <BoxWrap2>
                    <WordWrap>
                      {data.musicName} - {data.musicianName}
                    </WordWrap>
                    <VillanType>#{data.feedType}</VillanType>
                  </BoxWrap2>
                  <ClapWrapper>👏</ClapWrapper>
                </BoxWrap>
                닉네임 : {data.ownerName}
                <WordBottomWrap>
                  {data.createdAt}-{data.viewCount}번
                </WordBottomWrap>
              </FeedBox>
            );
          })}
        </FeedWrap>

        <Footer />
      </MainPageContainer>
    </MainPageWrapper>
  );
};

export default Main;

const BackgroundWrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const CategoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;

const BackgroundImg = styled.div`
  background-image: url("/background-1.svg");
`;
const FeedWrap = styled.div`
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
  background: gray;
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
  margin: 10px 10px 8px 10px;
  color: rgba(0, 0, 0, 0.87);
  font-weight: 700;
`;
const VillanType = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  display: block;
  margin: 0px 10px;
`;
const WordBottomWrap = styled.div`
  display: flex;
  color: rgba(0, 0, 0, 0.6);
`;

const ClapWrapper = styled.div`
  border-radius: 8px;
  border: 2px solid #651fff;
  width: 60px;
  height: 33px;
  flex-shrink: 0;
  text-align: center;
  margin: 10px;
`;

////
const MainPageWrapper = styled.div`
  width: 100%;
  position: flex;
  top: 0;
  bottom: 0;
  height: 100vh;
`;

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 186px);
  align-items: center;
`;
