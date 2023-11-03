import styled from "@emotion/styled";
import Body from "./body";
import Notification from "@/api/Notification";
import { useEffect } from "react";

const NoticeForm = () => {
  const { notice } = Body();
  const { notification_read } = Notification();
  console.log(notice);
  const data = notice;

  function getTimeAgo(dateString: any) {
    const date: any = new Date(dateString);
    const now: any = new Date();
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "방금";
    } else if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else {
      return `${days}일 전`;
    }
  }
  // b6d28bae6ee64dde8eed40522c022b32
  useEffect(() => {
    for (let i = 0; i < data?.length; i++) {
      if (data[i]?.notificationId) {
        notification_read(data[i]?.notificationId);
      }
    }
  }, []);
  // 예시: 현재 시간에서 30분 전의 시간을 표시
  const date = new Date();
  date.setMinutes(date.getMinutes() - 30);

  const timeAgo = getTimeAgo(date);
  console.log(data?.length);
  console.log(timeAgo); // "30분 전" 또는 해당하는 텍스트 출력
  const sortedData = data?.slice().sort((a: any, b: any) => {
    // Compare the 'createdAt' timestamps for sorting
    const dateA: any = new Date(a.createdAt);
    const dateB: any = new Date(b.createdAt);

    return dateB - dateA; // To sort in descending order (most recent first)
  });
  return (
    <>
      {sortedData?.map((item: any) => {
        return (
          <NoticeBox ownerRead={item.ownerRead}>
            <NoticeClap>👏</NoticeClap>
            <NoticeWordWrapper>
              <NoticeWord>{item.ownerName} 님의</NoticeWord>
              <NoticeWord>
                {item.musicName} - {item.musicianName}
              </NoticeWord>
              <NoticeWord>
                {item.interactionCount}명에게 박수받았어요!
                {/* {item.ownerRead} */}
              </NoticeWord>
            </NoticeWordWrapper>
            <NoticeTimer>{getTimeAgo(item.createdAt)}</NoticeTimer>
          </NoticeBox>
        );
      })}
    </>
  );
};
// item.ownerRead == "UNREAD"?
export default NoticeForm;
const NoticeClap = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 20px;
  margin-right: 20px;
`;
const NoticeBox = styled.div<{ ownerRead?: any }>`
  width: 355px;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.ownerRead === "UNREAD" ? "rgba(101, 31, 255, 0.12)" : "white"};
`;

const NoticeWordWrapper = styled.div`
  max-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const NoticeWord = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 3px;
`;

const NoticeTimer = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  flex: 1;
  text-align: right;
  margin-right: 20px;
`;
