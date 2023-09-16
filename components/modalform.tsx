import styled from "@emotion/styled";
import DeleteFeed from "@/api/deleteFeed";
interface StyledComponentProps {
  background?: string; // background 속성을 정의합니다.
}

export interface WriteEvaluationProps {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalForm = (
  // 원래 이 타입
  // React.Dispatch<React.SetStateAction<boolean>>
  { setModalIsOpen }: WriteEvaluationProps
) => {
  const { deletes } = DeleteFeed();
  return (
    <ModalBox>
      <ModalFlex>
        <ModalWordWrap>노래 제목 - 가수</ModalWordWrap>
        <ModalWordWrap>노래를 삭제하시겠어요?</ModalWordWrap>
        <ModalWordSubWrap>삭제된 노래는 복구할 수 없어요.</ModalWordSubWrap>
        <ModalButtonFlex>
          <ModalButton background="rgba(0, 0, 0, 0.04)">
            <ModalButtonWord
              color="rgba(0, 0, 0, 0.60);"
              onClick={() => setModalIsOpen(false)}
            >
              아니오
            </ModalButtonWord>
          </ModalButton>
          <ModalButton background="#651FFF">
            <ModalButtonWord color="#FFF;" onClick={() => deletes()}>
              네, 삭제할게요
            </ModalButtonWord>
          </ModalButton>
        </ModalButtonFlex>
      </ModalFlex>
    </ModalBox>
  );
};

export default ModalForm;
const ModalBox = styled.div`
  width: 311px;
  height: 171px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #fff;
`;
const ModalFlex = styled.div`
  display: flex;
  flex-direction: column;
`;
const ModalWordWrap = styled.div`
  color: #000;

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 10px 16px 0px 16px;
`;

const ModalWordSubWrap = styled.div`
  color: rgba(0, 0, 0, 0.6);

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 16px;
`;

const ModalButtonFlex = styled.div`
  display: flex;
`;
const ModalButton = styled.div<StyledComponentProps>`
  width: 135px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${(props) => props.background};

  margin: 10px;
`;

const ModalButtonWord = styled.div`
  color: ${(props) => props.color};
  text-align: center;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 3;
`;
