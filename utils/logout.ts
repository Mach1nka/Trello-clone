import { useContext, useCallback } from 'react';

import { AuthContext } from 'context/AuthContext';
import { BoardContext } from 'context/BoardContext';
import { AuthActions } from 'services/resources/model/auth.model';
import { BoardActions } from 'services/resources/model/board.model';

export const useLogout = (): { logout: () => void } => {
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { dispatch: boardDispatch } = useContext(BoardContext);

  const logout = useCallback(() => {
    authDispatch({ type: AuthActions.LOG_OUT });
    boardDispatch({ type: BoardActions.DELETE_BOARDS_DATA });
  }, []);
  return { logout };
};
