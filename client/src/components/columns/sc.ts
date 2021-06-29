import styled from 'styled-components';
import { Typography, Button, Backdrop } from '@material-ui/core';

import { MUOptions } from '../../types/sc';

interface Props {
  isPointColumns: boolean;
}

const ColumnsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  height: 85vh;
  margin: 2.3% 0;
  padding: 8px;
  box-sizing: border-box;
  background-color: rgba(241, 245, 237, 0.3);
`;

const DragWrapper = styled.div<Props>`
  & > * {
    pointer-events: ${(props) => (props.isPointColumns ? 'none' : 'auto')};
  }
`;

const ColumnSC = {
  Container: styled.div`
    width: 270px;
    height: 100%;
    margin: 0 4px;
    border-radius: 5px;
    cursor: pointer;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    width: 270px;
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
    width: 270px;
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
  Backdrop: styled(Backdrop)`
    color: #fff;
    background-color: rgba(0, 0, 0, 0.2);
    ${({ theme }: MUOptions) => `
      z-index: ${theme.zIndex.drawer + 1} !important;
    }`}
  `
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
  ${({ theme }: MUOptions) => `
  background-color: rgba(240, 125, 57, 0.85) !important;
  &:hover {
    background-color: ${theme.palette.warning.main} !important;
  }`}
`;

export { ColumnsContainer, ColumnSC, ModalForm, SubmitButton, DragWrapper };
