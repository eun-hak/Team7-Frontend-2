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

  return (
    <MusicWrapper onSubmit={handleSubmit(onSubmit)}>
      <MusicInput
        {...register("songTitle", { required: "원곡 노래 제목은 필수입니다." })}
        placeholder="원곡 노래 제목을 입력해주세요. (필수)"
      />
      {errors.songTitle && <div>errors.songTitle.message</div>}
      <CustomRadio>
        <RadioInput
          type="radio"
          id="option1"
          name="options"
          value="option1"
          checked={selectedOption === "option1"}
          onChange={handleOptionChange}
        />
        <RadioLabel htmlFor="option1">Option 1</RadioLabel>
      </CustomRadio>

      <CustomRadio>
        <RadioInput
          type="radio"
          id="option2"
          name="options"
          value="option2"
          checked={selectedOption === "option2"}
          onChange={handleOptionChange}
        />
        <RadioLabel htmlFor="option2">Option 2</RadioLabel>
      </CustomRadio>

      <CustomRadio>
        <RadioInput
          type="radio"
          id="option3"
          name="options"
          value="option3"
          checked={selectedOption === "option3"}
          onChange={handleOptionChange}
        />
        <RadioLabel htmlFor="option3">Option 3</RadioLabel>
      </CustomRadio>
    </MusicWrapper>
  );
};

export default WithDrawForm;

const MusicWrapper = styled.form`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
`;

const MusicInput = styled.input`
  width: 327px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-top: 8px;
  border: none;
`;
const CustomRadio = styled.div`
  display: flex;
  /* align-items: center; */
  margin-right: 20px;
  cursor: pointer;
  margin-top: 30px;
`;

const RadioInput = styled.input`
  display: none;

  &:checked + label {
    color: #651fff; /* 선택한 경우 텍스트 색상 변경 */

    &::after {
      content: url("/withdrawCheck.png"); /* 선택한 경우 체크 아이콘 표시 */
      display: inline-block;
      margin-left: 40px;
      /* margin-top: 5px; */
    }
  }
`;

const RadioLabel = styled.label`
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  /* margin-top: 5px; */
`;
