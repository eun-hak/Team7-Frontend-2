"use client";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Home from "@/public/home.svg";
import Add from "@/public/add-box.svg";
import Mypage from "@/public/mypage.svg";
import { isLoginStorage } from "@/util/loginStorage";

const Footer = () => {
  const router = useRouter();
  const isLogin = isLoginStorage();
  const handleClickPlus = () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요");
      router.push("/sign");
    } else {
      router.push("/upload");
    }
  };
  const handleClickMain = () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요");
      router.push("/sign");
    } else {
      router.push("/main?value=전체");
    }
  };
  const handleClickMypage = () => {
    if (!isLogin) {
      alert("로그인 후 이용해주세요");
      router.push("/sign");
    } else {
      router.push("/mypage");
    }
  };

  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterIcons>
          <FooterIconLink onClick={handleClickMain}>
            <FooterIcon>
              <Home />
            </FooterIcon>
          </FooterIconLink>
          <FooterIcon onClick={handleClickPlus}>
            <Add />
          </FooterIcon>
          <FooterIconLink onClick={handleClickMypage}>
            <FooterIcon>
              <Mypage />
            </FooterIcon>
          </FooterIconLink>
        </FooterIcons>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const FooterContainer = styled.footer`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: white;
  padding: 16px 0;
  align-items: center;
`;

const FooterIcons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const FooterIconLink = styled.div`
  cursor: pointer;
`;

const FooterIcon = styled.div`
  cursor: pointer;
`;
