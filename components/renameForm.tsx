import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";
const RenameForm = () => {
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
    <RenameWrapper onSubmit={handleSubmit(onSubmit)}>
      <RenameInput
        {...register("rename", { required: "1글자 이상 적어주세요" })}
        placeholder="닉네임을 입력해주세요"
      />
    </RenameWrapper>
  );
};

export default RenameForm;

const RenameWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RenameInput = styled.input`
  width: 327px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-top: 8px;
  border: none;
`;
