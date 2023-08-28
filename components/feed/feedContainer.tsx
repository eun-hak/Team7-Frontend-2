"use client";
import { MainFeed2 } from "@/type/feedtype";
// import { MainFeed } from "@/type/feedtype";
import styled from "@emotion/styled";
// { data }: { data: MainFeed }

// 노래제목 : data.musicName
// 노래가수 : data.musicianName
// 빌런유형 : data.feedType
// 닉네임   : data.ownerName
// 조회수   : data.viewCount
// 생성일   : data.createdAt
// 박수     : 아직 안만들어짐
const FeedContainer = (data: any) => {
  return (
    <>
      {data.map((data: any) => {
        return (
          <FeedWrap>
            <FeedBox>
              <BoxWrap>
                <WordWrap>
                  {data.musicName} {data.musicianName}
                </WordWrap>
                박수
              </BoxWrap>
              {data.ownerName}
              <WordBottomWrap>
                {data.createdAt}
                {data.viewCount}
              </WordBottomWrap>
            </FeedBox>
          </FeedWrap>
        );
      })}
    </>
  );
};

export default FeedContainer;

const FeedWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const FeedBox = styled.div`
  width: 327px;
  height: 128px;
  border-radius: 16px;
  background: #fff;
  display: flex;
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

//노래제목 / 빌런 사이 간격
const WordWrap = styled.div`
  display: block;
`;

const WordBottomWrap = styled.div`
  display: flex;
`;
