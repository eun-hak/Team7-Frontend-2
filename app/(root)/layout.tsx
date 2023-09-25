"use client";
import styled from "@emotion/styled";
import "../globals.css";

import { RecoilRoot } from "recoil";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BodyStyle>
      <BgStyle>
        <RecoilRoot>{children}</RecoilRoot>
      </BgStyle>
    </BodyStyle>
  );
};

export default RootLayout;

const BodyStyle = styled.body``;

const BgStyle = styled.div`
  background-color: #fff;
  min-height: calc(100vh * 1);
`;
