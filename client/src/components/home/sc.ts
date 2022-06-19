import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Typography, Fab, DialogTitle, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { MUOptions } from '../../types/sc';

interface Props {
  isDefaultCard: boolean | undefined;
}

const List = styled.div`
  display: flex;
  height: 90%;
  align-items: start;
  flex-wrap: wrap;
`;

const BoardSC = {
  Board: styled.div<Props>`
    display: flex;
    flex-direction: ${(props) => (props.isDefaultCard ? 'row' : 'column')};
    align-items: ${(props) => (props.isDefaultCard ? 'center' : '')};
    color: ${(props) => (!props.isDefaultCard ? '#fff' : '')};
    overflow: hidden;
    justify-content: ${(props) => (props.isDefaultCard ? 'center' : 'space-between')};
    margin: ${(props) => (props.isDefaultCard ? '0 15px 12px 0' : '')};
    width: 200px;
    height: 100px;
    background-color: ${(props) => (!props.isDefaultCard ? '#0b3c48' : '#f1f5ed')};
    border-radius: 5px;
    padding: 8px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s ease-in;
    &:hover {
      box-shadow: inset 0px 2px 50px 10px rgba(0, 0, 0, 0.23);
    }
  `,
  Link: styled(Link)`
    margin-right: 15px;
    margin-bottom: 12px;
  `,
  BoardOptions: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
  Card: styled(Card)`
    min-height: 40vh;
    margin-top: 5%;
    padding: 30px;
    box-sizing: border-box;
    ${({ theme }: MUOptions) => `
      background-color: ${theme.palette.primary.contrastText};
      }`}
  `,
  Name: styled(Typography)`
    max-height: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
  EditBoardButton: styled(Fab)`
    width: 22px !important;
    height: 22px !important;
    min-height: unset !important;
  `,
  DialogTitle: styled(DialogTitle)`
    text-align: center;
  `,
  Autocomplete: styled(Autocomplete)`
    width: 260px;
  `
};

const ShareModalForm = styled.form`
  width: 100%;
  height: 140px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
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

export { List, BoardSC, ModalForm, ShareModalForm, SubmitButton };
