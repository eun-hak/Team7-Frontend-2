import styled from "@emotion/styled";
import { ReactEventHandler, useState } from "react";
import { useFormContext } from "react-hook-form";
const WithDrawForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useFormContext();

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const onSubmit = (data: any) => {
    // 제출 버튼을 클릭했을 때 실행되는 함수
    console.log(data); // 폼 데이터 출력
  };
  const validateVillanType = () => {
    const selectedVillanType = getValues("villainType");
    if (!selectedVillanType) {
      return "빌런 유형은 필수입니다.";
    }
    return true;
  };
  const WitdrawReason = [
    "앱이 복잡하고 어려워요.",
    "노래를 업로드하는 과정이 어려워요.",
    "재미있는 노래가 부족해요.",
    "SNS 기능이 부족해요.",
    "기타",
  ];
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(-1);
  return (
    <MusicWrapper onSubmit={handleSubmit(onSubmit)}>
      {/* <MusicInput
        {...register("songTitle", { required: "원곡 노래 제목은 필수입니다." })}
        placeholder="원곡 노래 제목을 입력해주세요. (필수)"
      />
      {errors.songTitle && <div>errors.songTitle.message</div>} */}

      {WitdrawReason.map((item, index) => (
        <CustomRadio>
          <RadioInput
            {...register("withdrawTitle")}
            key={index}
            type="radio"
            id={`option${index}`}
            // name="options"
            value={`option${index}`}
            checked={selectedOption === `option${index}`}
            onChange={(e) => {
              handleOptionChange(e);
              setSelectedButtonIndex(index);
            }}
          />
          <RadioLabel htmlFor={`option${index}`}>{item}</RadioLabel>
          {selectedButtonIndex === index ? (
            <img src="/withdrawCheck.png"></img>
          ) : null}
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
