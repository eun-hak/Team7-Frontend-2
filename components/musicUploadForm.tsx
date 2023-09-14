import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";
const MusicUploadForm = () => {
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
      <MusicInput
        {...register("artist", { required: "원곡 노래 제목은 필수입니다." })}
        placeholder="원곡 가수 제목을 입력해주세요. (필수)"
      />
      {errors.artist && <div>errors.artist.message</div>}
      <VillanSelect
        {...register("villainType", { validate: validateVillanType })}
        placeholder="빌런 유형을 입력해주세요. (필수)"
      >
        <VillanOption>빌런 유형을 입력해주세요. (필수)</VillanOption>
        <VillanOption>고음괴물</VillanOption>
        <VillanOption>화음귀신</VillanOption>
        <VillanOption>하이라이트도둑</VillanOption>
        <VillanOption>힙합전사</VillanOption>
        <VillanOption>소몰이대장</VillanOption>
        <VillanOption>삑사리요정</VillanOption>
        <VillanOption>기타</VillanOption>
      </VillanSelect>
      {errors.villainType && (
        <span className="error-message">errors.villainType.message</span>
      )}
      <MusicDescription
        {...register("description", { required: "설명을 입력해주세요" })}
        placeholder="설명을 입력해주세요"
      />
      {errors.artist && <div>errors.artist.message</div>}
      {/* 제출 버튼 */}
      {/* <button type="submit" disabled={isSubmitting}>
        Submit
      </button> */}
    </MusicWrapper>
  );
};

export default MusicUploadForm;

const MusicWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const MusicDescription = styled.input`
  width: 327px;
  height: 96px;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-top: 8px;
  border: none;
`;

const VillanSelect = styled.select`
  width: 327px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-top: 8px;
  border: none;
`;

const VillanOption = styled.option``;
