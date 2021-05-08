import styled from 'styled-components';

const ColumnsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  height: 85vh;
  margin: 3% 0;
  padding: 8px;
  box-sizing: border-box;
  background-color: rgba(241, 245, 237, 0.3);
`;

const ColumnContainer = styled.div`
  width: 270px;
  height: 100%;
  margin: 0 4px;
`;

const ColumnContent = styled.div`
  width: 270px;
  max-height: 100%;
  border-radius: 5px;
  padding: 0 8px;
  box-sizing: border-box;
  background-color: #ebecf0;
`;

const ColumnHeader = styled.div`
  display: flex;
  padding: 10px 8px;
  justify-content: space-between;
  align-items: center;
`;

const ColumnFooter = styled.div``;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const CreateColumnContainer = styled.div`
  width: 270px;
  flex-shrink: 0;
  height: fit-content;
  background-color: rgba(241, 245, 237, 0.7);
  border-radius: 5px;
`;

export {
  ColumnsContainer,
  ColumnContainer,
  ColumnHeader,
  ColumnContent,
  ColumnFooter,
  CardContainer,
  CreateColumnContainer
};
