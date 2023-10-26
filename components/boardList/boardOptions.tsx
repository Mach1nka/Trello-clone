import { useState, useCallback, useContext } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';

import { ErrorInfo } from 'services/HttpService/types';
import { AuthContext } from 'context/AuthContext';
import { BoardContext } from 'context/BoardContext';
import {
  AlertContext,
  AlertActions,
  AlertStatusData,
} from 'context/AlertContext';
import { LoaderContext } from 'context/LoaderContext';
import { BoardActions } from 'services/resources/model/board.model';
import { deleteBoard } from 'services/resources/request/board';
import { RenameBoardModal } from './modal/rename';
import { ShareBoardModal } from './modal/share';
import { BoardSC as SC } from './sc';

interface Props {
  boardId: string;
}

export const BoardOptions: React.FC<Props> = ({ boardId }) => {
  const { user } = useContext(AuthContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const { dispatch: boardDispatch } = useContext(BoardContext);
  const { setLoaderState } = useContext(LoaderContext);

  const [isOpenShareModal, setShareModalView] = useState(false);
  const [isOpenRenameModal, setRenameModalView] = useState(false);

  const onDeleteHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setLoaderState(true);
      //  @note Type of user must be improved in further. Fields must be string after authorization
      deleteBoard({ userId: user.id as string, boardId })
        .then((resp) => {
          boardDispatch({
            type: BoardActions.PUT_BOARDS,
            payload: resp.data,
          });
          alertDispatch({
            type: AlertActions.ADD,
            payload: {
              id: `${boardId}`,
              message: 'Board has deleted successfully',
              status: AlertStatusData.SUCCESS,
            },
          });
        })
        .catch((err: ErrorInfo) => {
          alertDispatch({
            type: AlertActions.ADD,
            payload: {
              id: `${Date.now()}`,
              message: err.message,
              status: AlertStatusData.ERROR,
            },
          });
        })
        .finally(() => setLoaderState(false));
    },
    [user.id, boardId]
  );

  const onShareHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShareModalView(true);
    },
    []
  );

  const onRenameHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setRenameModalView(true);
    },
    []
  );

  return (
    <>
      <SC.BoardOptions>
        <SC.EditBoardButton aria-label="delete board" onClick={onDeleteHandler}>
          <DeleteIcon fontSize="inherit" />
        </SC.EditBoardButton>
        <SC.EditBoardButton aria-label="share board" onClick={onShareHandler}>
          <ShareIcon fontSize="inherit" />
        </SC.EditBoardButton>
        <SC.EditBoardButton aria-label="rename board" onClick={onRenameHandler}>
          <EditIcon fontSize="inherit" />
        </SC.EditBoardButton>
      </SC.BoardOptions>
      <RenameBoardModal
        isOpen={isOpenRenameModal}
        setModalView={setRenameModalView}
        boardId={boardId}
        userId={user.id as string}
      />
      <ShareBoardModal
        modalView={isOpenShareModal}
        setModalView={setShareModalView}
        boardId={boardId}
      />
    </>
  );
};