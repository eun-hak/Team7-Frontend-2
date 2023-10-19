import styled from "@emotion/styled";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { useRecoilState } from "recoil";
import { activewithdrawform } from "@/recoil/recoilstore";
const WithDrawForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();
  const [isEmpty, setIsEmpty] = useRecoilState(activewithdrawform);
  const widthdrawTitle: string = watch("withdrawTitle");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // 제출 버튼을 클릭했을 때 실행되는 함수
    console.log(data); // 폼 데이터 출력
  };
  const validateVillanType = () => {
    const selectedVillanType = watch("villainType");
    if (!selectedVillanType) {
      return "빌런 유형은 필수입니다.";
    }
    return true;
  };

  const WitdrawReason = [
    { value: 1, label: "앱이 복잡하고 어려워요." },
    { value: 2, label: "노래를 업로드하는 과정이 어려워요." },
    { value: 3, label: "재미있는 노래가 부족해요." },
    { value: 4, label: "SNS 기능이 부족해요." },
    { value: 5, label: "기타" },
  ];

  const onChangeWithdraw = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setIsEmpty(false) : setIsEmpty(true);
  };
  useEffect(() => {
    if (errors.withdrawTitle) {
      alert(errors.withdrawTitle.message);
    }
  }, [errors.withdrawTitle]);

  return (
    <MusicWrapper onSubmit={handleSubmit(onSubmit)}>
      {WitdrawReason.map(({ value, label }) => (
        <CustomRadio key={value}>
          <RadioInput
            id={`option${value}`}
            type="radio"
            {...register("withdrawTitle", {
              required: "탈퇴 사유를 선택해주세요.",
            })}
            onChange={(e) => onChangeWithdraw(e)}
            value={`${label}`}
          />
          <RadioLabel htmlFor={`option${value}`}>{label}</RadioLabel>
          {widthdrawTitle === `${label}` && <img src="/withdrawCheck.png" />}
        </CustomRadio>
      ))}
    </MusicWrapper>
  );
};

export default WithDrawForm;

const MusicWrapper = styled.form`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: flex-start;
`;

const MusicInput = styled.input`
  width: 327px;
  /* width: 100px; */
  height: 48px;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-top: 8px;
  border: none;
`;
const CustomRadio = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  cursor: pointer;
  margin-top: 30px;
  /* width: 100%; */
`;

const RadioInput = styled.input`
  display: none;
  width: 100%;
  /* margin-right: 200px; */
  &::after {
    content: "";
    margin-left: 550px;
  }
  &:checked + label {
    color: #651fff; /* 선택한 경우 텍스트 색상 변경 */

    /* &::after {
      content: url("/withdrawCheck.png"); 
      
    } */
  }
`;

const RadioLabel = styled.label`
  /* position: relative; */
  max-width: 600px;
  /* overflow-x: visible; */
  padding-left: 30px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  /* margin-top: 5px; */
`;
