import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Board } from '../sc';
import { useStyles } from '../constants';
import { deleteColumnsData } from '../../../store/column/actions';
import BoardOptions from './board-options';
import CreateBoardModal from './create-board';

interface Props {
  isDefaultCard?: boolean;
  boardName: string;
  boardId?: string;
  isOwnBoards?: boolean;
}

const BoardItem: React.FC<Props> = ({ isDefaultCard, boardName, boardId, isOwnBoards }) => {
  const [isOpenModal, setModalView] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  if (!isDefaultCard && boardId && isOwnBoards) {
    const locationParams = { pathname: `/boards/board/${boardId}`, state: { boardName, boardId } };
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to={locationParams}
        onClick={() => dispatch(deleteColumnsData())}
      >
        <Board isDefaultCard={isDefaultCard}>
          <Typography
            color="inherit"
            className={classes.boardName}
            variant="subtitle2"
            align="left"
          >
            {boardName}
          </Typography>
          <BoardOptions boardId={boardId} />
        </Board>
      </Link>
    );
  }
  if (!isDefaultCard && !isOwnBoards && boardId) {
    const locationParams = { pathname: `/boards/board/${boardId}`, state: { boardName, boardId } };
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to={locationParams}
        onClick={() => dispatch(deleteColumnsData())}
      >
        <Board isDefaultCard={isDefaultCard}>
          <Typography
            color="inherit"
            className={classes.boardName}
            variant="subtitle2"
            align="left"
          >
            {boardName}
          </Typography>
        </Board>
      </Link>
    );
  }
  return (
    <>
      <Board onClick={() => setModalView(true)} isDefaultCard={isDefaultCard}>
        <Typography color="inherit" className={classes.boardName} variant="subtitle2" align="left">
          {boardName}
        </Typography>
      </Board>
      <CreateBoardModal isOpen={isOpenModal} setModalView={setModalView} />
    </>
  );
};

export default BoardItem;
