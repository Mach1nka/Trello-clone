import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@material-ui/core';

import BoardItem from './components/board-item';
import { useAppDispatch } from '../../store';
import { selectBoardsData } from '../../store/selectors';
import dispatchEntityHelper from '../../utils/dispatch-entity-helper';
import { getBoards } from '../../service/resources/requests/board';
// import { deleteColumnsData } from '../../store/actions/column';
// import { deleteCardsData } from '../../store/actions/card';
// import { resetModalData } from '../../store/actions/modal';
import { List, BoardSC as SC } from './sc';
import { SliceName } from '../../service/resources/models/common.model';
import { BoardThunkAction } from '../../service/resources/models/board.model';

const BoardsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { ownBoards, sharedBoards } = useSelector(selectBoardsData);

  useEffect(() => {
    dispatchEntityHelper({
      sliceName: SliceName.Board,
      actionType: BoardThunkAction.GetBoards,
      fetchData: {},
      withLoading: true,
      dispatch,
      fetchFn: getBoards
    });

    // dispatch(deleteColumnsData());
    // dispatch(deleteCardsData());
    // dispatch(resetModalData());
  }, []);

  return (
    <Container>
      <SC.Card>
        <Typography gutterBottom color="secondary" variant="h5" component="h5">
          My Boards
        </Typography>
        <List>
          <BoardItem isDefaultCard boardName="create new board" />
          {ownBoards.map((el) => (
            <BoardItem isOwnBoards key={el.id} boardName={el.name} boardId={el.id} />
          ))}
        </List>
        {sharedBoards.length ? (
          <>
            <Typography gutterBottom color="secondary" variant="h5" component="h5">
              Shared Boards
            </Typography>
            <List>
              {sharedBoards.map((el) => (
                <BoardItem key={el.id} boardName={el.name} boardId={el.id} />
              ))}
            </List>
          </>
        ) : null}
      </SC.Card>
    </Container>
  );
};

export default BoardsList;
