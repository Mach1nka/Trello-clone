import styled from 'styled-components';
import { Typography, Button, Theme } from '@material-ui/core';

interface DragWrapperProps {
  isPointColumns: boolean;
}

interface ColumnProps {
  dragStyles: string | null;
}

interface ShadowColumnProps {
  isDragging: boolean;
}

const ColumnWidth = 270;

const ColumnsContainer = {
  Container: styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    width: 100%;
    height: 85vh;
    margin: 2.3% 0;
    padding: 8px;
    box-sizing: border-box;
    background-color: rgba(241, 245, 237, 0.3);
  `,
  ShadowColumn: styled.div<ShadowColumnProps>`
    opacity: 0;
    width: ${ColumnWidth + 4 * 2}px;
    display: ${(props) => (props.isDragging ? 'block' : 'none')};
  `,
};

const DragWrapper = styled.div<DragWrapperProps>`
  & > * {
    pointer-events: ${(props) => (props.isPointColumns ? 'none' : 'auto')};
  }
`;

const ColumnSC = {
  // @note doesn't use
  Container: styled.div<ColumnProps>`
    width: ${ColumnWidth}px;
    height: 100%;
    margin: 0 4px;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${(props) =>
      props.dragStyles ? `${props.dragStyles} !important` : ''};
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    width: ${ColumnWidth}px;
    margin: 0 4px;
    max-height: 100%;
    border-radius: 5px;
    padding: 0 8px;
    box-sizing: border-box;
    background-color: #ebecf0;
  `,
  Header: styled.div`
    display: flex;
    flex-grow: 1;
    padding: 10px 8px;
    justify-content: space-between;
    align-items: center;
  `,
  Footer: styled.div`
    flex-grow: 1;
  `,
  CreateColumnContainer: styled.div`
    width: ${ColumnWidth}px;
    margin: 0 4px;
    flex-shrink: 0;
    height: fit-content;
    background-color: rgba(241, 245, 237, 0.7);
    border-radius: 5px;
  `,
  Name: styled(Typography)`
    display: block;
    font-size: 19px;
    font-weight: 400;
    max-width: 190px;
    overflow-wrap: break-word;
  `,
};

const ModalForm = styled.form`
  height: 70px;
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

const SubmitButton = styled(Button)`
  ${({ theme }: { theme: Theme }) => `
  background-color: rgba(240, 125, 57, 0.85) !important;
  &:hover {
    background-color: ${theme.palette.warning.main} !important;
  }`}
`;

export { ColumnsContainer, ColumnSC, ModalForm, SubmitButton, DragWrapper };
