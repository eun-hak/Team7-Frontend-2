"use client";
import styled from "@emotion/styled";
import ButtonContainer from "@/components/start-button";
import Logo from "@/public/logo.svg";

const Home = () => {
  return (
    <Container>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <ButtonWrapper>
        <ButtonContainer label="시작하기" />
      </ButtonWrapper>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
`;

const LogoWrapper = styled.div`
  width: 80%;
  padding: 0 10px;
`;

const ButtonWrapper = styled.div`
  width: 80%;
  padding: 0 10px;
  margin-top: 100px;
`;
