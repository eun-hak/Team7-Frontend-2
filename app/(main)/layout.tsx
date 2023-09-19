"use client";
import styled from "@emotion/styled";
import "../globals.css";

import { Providers } from "../providers";
import { RecoilRoot } from "recoil";
import ReactQueryProvider from "../ReactQueryProvider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BodyStyle>
      <BgStyle>
        <Providers>
          {/* <RecoilRoot> */}
          <ReactQueryProvider>{children}</ReactQueryProvider>
          {/* </RecoilRoot> */}
        </Providers>
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
