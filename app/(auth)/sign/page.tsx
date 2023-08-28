"use client";
import styled from "@emotion/styled";
import Close from "@/public/close.svg"; // Assuming these are SVG components
import Bubble from "@/public/bubble.svg";
import Link from "next/link";
import ButtonContainer from "@/components/start-button";

const Sign = () => {
  return (
    <SignWrapper>
      <HeaderWrapper>
        <Link href="/main" passHref>
          <CloseButton />
        </Link>
        <Title>로그인하고 노래를 올려보세요</Title>
      </HeaderWrapper>

      <ButtonsContainer>
        <BubbleButton>
          <Bubble />
        </BubbleButton>

        <ButtonContainer label="카카오로 시작하기" />

        <ButtonContainer label="다른 방법은 아직 준비 중이에요" />
      </ButtonsContainer>
    </SignWrapper>
  );
};

export default Sign;

const SignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

const CloseButton = styled(Close)`
  width: 32px;
  height: 32px;
  margin-right: 18px;
  margin-top: 18px;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  align-self: flex-start;
  margin-top: 34px;
  margin-left: 16px;
`;

const BubbleButton = styled.button`
  margin: auto;
  border: none;
  background-color: transparent;
  cursor: pointer;
  animation: bounce 1s infinite;

  @keyframes bounce {
    100% {
      transform: translateY(0%);
    }

    50% {
      transform: translateY(-25%);
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 16px;
  margin-bottom: 16px;
`;
