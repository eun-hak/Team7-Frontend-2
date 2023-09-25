"use client";
import styled from "@emotion/styled";
import "../globals.css";
import { Providers } from "../providers";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BodyStyle>
      <BgStyle>
        <Providers>{children}</Providers>
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
