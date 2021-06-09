import styled from 'styled-components';

interface Props {
  isPointCards: boolean;
}

const CardsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-x: auto;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: inherit;
  min-height: 56px;
  background-color: #fff;
  padding: 7px;

  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0px 4px 6px -4px rgb(0 0 0 / 50%);
`;

const DragWrapper = styled.div<Props>`
  margin-bottom: 8px;
  & * {
    pointer-events: ${(props) => (props.isPointCards ? 'none' : 'auto')};
  }
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20px 5px 20px;
`;

export { CardsContainer, CardContainer, ModalForm, DragWrapper };
