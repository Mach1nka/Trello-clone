import styled from 'styled-components';
import { Typography, DialogActions, Button, TextField } from '@material-ui/core';

import { MUOptions } from '../../types/sc';

interface Props {
  isPointCards: boolean;
}

const CardsContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-x: auto;
`;

const CardSC = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    width: inherit;
    min-height: 56px;
    background-color: #fff;
    padding: 7px;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0px 4px 6px -4px rgb(0 0 0 / 50%);
    transition: all ease-in 0.1s;
    :hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.03);
    }
  `,
  DescriptionText: styled(Typography)`
    min-height: 80px;
    font-size: 15px;
    white-space: pre-wrap;
  `,
  Name: styled(Typography)`
    font-size: 20px !important;
    font-weight: bold !important;
    padding-top: 5px;
    padding-bottom: 5px;
    min-height: 30px;
  `,
  DialogActions: styled(DialogActions)`
    justify-content: space-between !important;
  `,
  ColumnNameButton: styled(Button)`
    padding: 0 !important;
    font-size: 15px;
    text-decoration: underline !important;
    text-transform: none !important;
    padding-left: 5px !important;
    min-width: unset !important;
    ${({ theme }: MUOptions) => `
      &:hover {
        color: ${theme.palette.primary.main} !important;
        background-color: unset !important;
      }`}
  `,
  NameField: styled(TextField)`
    & .MuiInput-input {
      font-size: 20px;
      font-weight: bold;
      padding-top: 5px;
      padding-bottom: 5px;
      min-height: 30px;
    }
  `,
  DescriptionField: styled(TextField)`
    & .MuiInputBase-input {
      padding: 10px 10px;
      min-height: 80px !important;
      font-size: 15px;
      resize: none;
      box-sizing: border-box;
    }
  `
};

const DragWrapper = styled.div<Props>`
  margin-bottom: 8px;
  & * {
    pointer-events: ${(props) => (props.isPointCards ? 'none' : 'auto')};
  }
`;

const CreateCardForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20px 5px 20px;
`;

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

export { CardsContainer, CardSC, CreateCardForm, ModalForm, DragWrapper, SubmitButton };
