"use client";
import { RecoilRoot } from "recoil";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <RecoilRoot>{children}</RecoilRoot>
    </html>
  );
};

export default RootLayout;
