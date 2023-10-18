import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";
import { activemusicform } from "@/recoil/recoilstore";
import { useRecoilState } from "recoil";
const MusicUploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    watch,
  } = useFormContext();
  const [isEmpty, setIsEmpty] = useRecoilState(activemusicform);
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

  const onChangeTitler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value && watch("artist") && watch("villainType")
      ? setIsEmpty(false)
      : setIsEmpty(true);
  };
  const onChangeArtist = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value && watch("songTitle") && watch("villainType")
      ? setIsEmpty(false)
      : setIsEmpty(true);
  };
  const onChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value && watch("artist") && watch("songTitle")
      ? setIsEmpty(false)
      : setIsEmpty(true);
  };
  if (isEmpty == false) {
    console.log("내용이 있음");
  }
  return (
    <MusicWrapper onSubmit={handleSubmit(onSubmit)}>
      <MusicInput
        {...register("songTitle", { required: "원곡 노래 제목은 필수입니다." })}
        onChange={(e) => onChangeTitler(e)}
        placeholder="원곡 노래 제목을 입력해주세요. (필수)"
      />
      {errors.songTitle && <div>{errors.songTitle.message as String}</div>}
      <MusicInput
        {...register("artist", { required: "원곡 가수 제목은 필수입니다." })}
        onChange={(e) => onChangeArtist(e)}
        placeholder="원곡 가수 제목을 입력해주세요. (필수)"
      />
      {errors.artist && <div>{errors.artist.message as String}</div>}
      <VillanSelect
        {...register("villainType", { validate: validateVillanType })}
        onChange={(e) => onChangeType(e)}
        placeholder="빌런 유형을 입력해주세요. (필수)"
        required
      >
        <VillanOption disabled selected value="">
          빌런 유형을 입력해주세요. (필수)
        </VillanOption>
        <VillanOption value="고음괴물">고음괴물</VillanOption>
        <VillanOption value="화음귀신">화음귀신</VillanOption>
        <VillanOption value="하이라이트도둑">하이라이트도둑</VillanOption>
        <VillanOption value="힙합전사">힙합전사</VillanOption>
        <VillanOption value="소몰이대장">소몰이대장</VillanOption>
        <VillanOption value="삑사리요정">삑사리요정</VillanOption>
        <VillanOption value="기타">기타</VillanOption>
      </VillanSelect>
      {errors.villainType && (
        <span className="error-message">
          {errors.villainType.message as String}
        </span>
      )}
      <MusicDescription
        {...register("description", { required: "설명을 입력해주세요" })}
        placeholder="설명을 입력해주세요"
      />
      {errors.description && <div>{errors.description.message as String}</div>}
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
  &:invalid {
    color: #9298a4;
  }
`;

const VillanOption = styled.option`
  /* z-index: 10; */
  color: black !important;
  &:disabled {
    display: none;
  }
`;
