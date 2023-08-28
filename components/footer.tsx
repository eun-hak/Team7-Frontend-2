"use client";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import Home from "@/public/home.svg";
import Add from "@/public/add-box.svg";
import Mypage from "@/public/mypage.svg";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/upload");
    // <Link href="/upload" />;
  };

  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterIcons>
          <FooterIconLink href="/main">
            <FooterIcon>
              <Home />
            </FooterIcon>
          </FooterIconLink>
          <FooterIcon onClick={handleClick}>
            <Add />
          </FooterIcon>
          <FooterIconLink href="/mypage">
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

// const FixedWrapper = styled.div`
//   position: fixed;
// `;
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

const FooterIconLink = styled(Link)`
  cursor: pointer;
`;

const FooterIcon = styled.div`
  cursor: pointer;
`;
