"use client";
import styled from "@emotion/styled";
import Notification from "@/public/notification.svg";
import Link from "next/link";
import BackIcon from "@/public/chevron-left.svg";
import { usePathname } from "next/navigation";
import { useFormContext } from "react-hook-form";
interface propsType {
  name: string;
  type: string;
}
const UploadHeader = (props: propsType) => {
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useFormContext();
  const onSubmit = (data: any) => {
    // 제출 버튼을 클릭했을 때 실행되는 함수
    console.log(data); // 폼 데이터 출력
  };
  return (
    <HeaderWrapper>
      <div>
        <HeaderTop>
          <Link href="/main?value=전체">
            <LogoLink>
              <BackIcon width={55} height={24} />
            </LogoLink>
          </Link>
          <WordWrap color="rgba(0, 0, 0, 0.87);">{props.name}</WordWrap>
          <ButtonForm onSubmit={handleSubmit(onSubmit)}>
            <ButtonWrap
              type="submit"
              disabled={isSubmitting}
              color="rgba(0, 0, 0, 0.38);"
              visibility={props.type}
            >
              올리기
            </ButtonWrap>
          </ButtonForm>
        </HeaderTop>
      </div>

      <WhiteBackground />
    </HeaderWrapper>
  );
};

export default UploadHeader;

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: white;
  z-index: 20;
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

const WordWrap = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-right: 20px;
`;

const ButtonForm = styled.form``;
const ButtonWrap = styled.button<{ color: string; visibility: string }>`
  background-color: white;
  border: none;
  color: ${(props) => props.color};
  visibility: ${(props) => props.visibility};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-right: 20px;
  cursor: pointer;
`;

const WhiteBackground = styled.div`
  height: 115px;
  background-color: white;
  position: absolute;
  top: 0;
`;
