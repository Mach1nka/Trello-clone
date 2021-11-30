import styled from 'styled-components';
import { List } from 'react-virtualized';
import 'react-virtualized/styles.css';
import {
  Typography,
  DialogActions,
  Button,
  TextField,
  Theme,
} from '@material-ui/core';

const CardHeight = 66;

const CardsContainer = styled(List)`
  &::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    visibility: hidden;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const CardSC = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    width: inherit;
    height: inherit;
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
  ColumnInfo: styled.div`
    display: flex;
    align-items: center;
  `,
  ColumnSelect: styled(TextField)`
    &.MuiFormControl-root {
      margin-left: 20px;
    }
  `,
  DialogActions: styled(DialogActions)`
    justify-content: space-between !important;
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
  `,
};

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
  ${({ theme }: { theme: Theme }) => `
  background-color: rgba(240, 125, 57, 0.85) !important;
  &:hover {
    background-color: ${theme.palette.warning.main} !important;
  }`}
`;

export {
  CardSC,
  CreateCardForm,
  ModalForm,
  SubmitButton,
  CardsContainer,
  CardHeight,
};
