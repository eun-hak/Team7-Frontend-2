"use client";
import { RecoilRoot } from "recoil";
import ReactQueryProvider from "./ReactQueryProvider";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <RecoilRoot>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </RecoilRoot>
    </html>
  );
};

export default RootLayout;
