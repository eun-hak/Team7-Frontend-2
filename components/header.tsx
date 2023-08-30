"use client";
import styled from "@emotion/styled";
import Logo from "@/public/logo.svg";
import Notification from "@/public/notification.svg";
import Link from "next/link";
import Category from "./category";
import { usePathname } from "next/navigation";

const Header = () => {
  // const pathname = usePathname();

  return (
    <HeaderWrapper>
      <div>
        <HeaderTop>
          <Link href="/main">
            <LogoLink>
              <Logo width={115} height={24} />
            </LogoLink>
          </Link>
          <Link href="/notice">
            <NotificationIcon>
              <Notification />
            </NotificationIcon>
          </Link>
        </HeaderTop>
      </div>

      <WhiteBackground />
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: white;
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

const NotificationIcon = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;
/* display: ${(props) => (props.isUploadPage ? "none" : "flex")}; */
// const CategoryWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: none;
// `;

const WhiteBackground = styled.div`
  height: 115px;
  background-color: white;
  position: absolute;
  top: 0;
`;
