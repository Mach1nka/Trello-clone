import styled from 'styled-components';

interface Props {
  readonly isDefaultCard: boolean | undefined;
}

const BoardsContainer = styled.div`
  display: flex;
  height: 90%;
  align-items: start;
  flex-wrap: wrap;
`;

const Board = styled.div<Props>`
  display: flex;
  flex-direction: ${(props) => (props.isDefaultCard ? 'row' : 'column')};
  align-items: ${(props) => (props.isDefaultCard ? 'center' : '')};
  color: ${(props) => (!props.isDefaultCard ? '#fff' : '')};
  overflow: hidden;
  justify-content: ${(props) => (props.isDefaultCard ? 'center' : 'space-between')};
  margin-right: 15px;
  margin-bottom: 12px;
  width: 200px;
  height: 100px;
  background-color: ${(props) => (!props.isDefaultCard ? '#0079bf' : '#f1f5ed')};
  border-radius: 5px;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover {
    box-shadow: inset 0px 2px 50px 10px rgba(0, 0, 0, 0.23);
  }
`;

const ModalForm = styled.form`
  height: 70px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

const ShareModalForm = styled.form`
  width: 100%;
  height: 140px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const BoardOptions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export { BoardsContainer, Board, ModalForm, BoardOptions, ShareModalForm };
