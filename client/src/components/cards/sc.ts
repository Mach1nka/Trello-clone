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
`;

export { CardsContainer, CardContainer };
