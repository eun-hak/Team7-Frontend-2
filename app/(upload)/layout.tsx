"use client";
import styled from "@emotion/styled";
import "../globals.css";

import { Inter } from "next/font/google";

import { RecoilRoot } from "recoil";
import ReactQueryProvider from "../ReactQueryProvider";
const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <BodyStyle>
        <BgStyle>
          <RecoilRoot>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </RecoilRoot>
        </BgStyle>
      </BodyStyle>
    </html>
  );
};

export default RootLayout;

const BodyStyle = styled.body`
  ${inter.className};
`;

const BgStyle = styled.div`
  background-color: #fff;
  min-height: calc(100vh * 1);
`;
