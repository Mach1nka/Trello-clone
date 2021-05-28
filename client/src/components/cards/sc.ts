import styled from 'styled-components';

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
  margin-bottom: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0px 4px 6px -4px rgb(0 0 0 / 50%);
  transition: all ease-in 0.1s;
  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20px 5px 20px;
`;

export { CardsContainer, CardContainer, ModalForm };
