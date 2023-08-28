"use client";
import styled from "@emotion/styled";
import Notification from "@/public/notification.svg";
import Link from "next/link";
import BackIcon from "@/public/chevron-left.svg";
import { usePathname } from "next/navigation";

const UploadHeader = () => {
  const pathname = usePathname();

  return (
    <HeaderWrapper>
      <div>
        <HeaderTop>
          <Link href="/main">
            <LogoLink>v
              <BackIcon width={55} height={24} />
            </LogoLink>
          </Link>
          <WordWrap color="rgba(0, 0, 0, 0.87);">새로운 노래</WordWrap>
          <WordWrap color="rgba(0, 0, 0, 0.38);">올리기</WordWrap>
        </HeaderTop>
      </div>

      <WhiteBackground />
    </HeaderWrapper>
  );
};

export default UploadHeader;

const HeaderWrapper = styled.header`
  width: 100%;
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

const WhiteBackground = styled.div`
  height: 115px;
  background-color: white;
  position: absolute;
  top: 0;
`;
