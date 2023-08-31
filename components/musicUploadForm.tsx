import styled from "@emotion/styled";

const MusicUploadForm = () => {
  return (
    <MusicWrapper>
      <MusicInput placeholder="원곡 노래 제목을 입력해주세요. (필수)" />
      <MusicInput placeholder="원곡 가수 제목을 입력해주세요. (필수)" />
      <VillanSelect placeholder="빌런 유형을 입력해주세요. (필수)">
        <VillanOption>빌런 유형을 입력해주세요. (필수)</VillanOption>
        <VillanOption>고음괴물</VillanOption>
        <VillanOption>화음귀신</VillanOption>
        <VillanOption>하이라이트도둑</VillanOption>
        <VillanOption>힙합전사</VillanOption>
        <VillanOption>소몰이대장</VillanOption>
        <VillanOption>삑사리요정</VillanOption>
        <VillanOption>기타</VillanOption>
      </VillanSelect>
    </MusicWrapper>
  );
};

export default MusicUploadForm;

const MusicWrapper = styled.div`
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

const VillanSelect = styled.select`
  width: 327px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-top: 8px;
  border: none;
`;

const VillanOption = styled.option``;
