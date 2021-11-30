import { useContext, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next/types';
import { getCookie } from 'cookies-next';

import { getBoards } from 'services/resources/request/board';
import { BoardContext } from 'context/BoardContext';
import { BoardsList } from 'components/boardList/boardList';
import { withUser } from 'hoc/withUser';
import { httpService } from 'services/HttpService';
import { BaseResponse } from 'services/HttpService/types';
import {
  BoardActions,
  BoardData,
  BoardDataServer,
} from 'services/resources/model/board.model';
import { AuthData } from 'services/resources/model/auth.model';

interface Props {
  boards: BoardData;
}

const BoardOverviewPage: NextPage<Props> = ({ boards }) => {
  const { dispatch: boardDispatch } = useContext(BoardContext);

  useEffect(() => {
    boardDispatch({
      type: BoardActions.PUT_BOARDS,
      payload: boards,
    });
  }, [boards]);

  return <BoardsList />;
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const authDataJson = getCookie('authData', { req, res });
  const authData: AuthData | null =
    authDataJson && JSON.parse(authDataJson.toString());

  try {
    if (authData) {
      httpService.setAuthToken(authData.token);
      const { data }: BaseResponse<BoardDataServer> = await getBoards();
      return {
        props: {
          boards: data,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default withUser(BoardOverviewPage);
