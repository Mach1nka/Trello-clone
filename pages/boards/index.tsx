import { useContext, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next/types';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

import { getBoards } from 'services/resources/request/board';
import { BoardContext } from 'context/BoardContext';
import { BoardsList } from 'components/boardList';
import { withUser } from 'hoc/withUser';
import { httpService } from 'services/HttpService';
import { BaseResponse } from 'services/HttpService/types';
import {
  BoardActions,
  BoardData,
  BoardDataServer,
} from 'services/resources/model/board.model';

interface Props {
  boards: BoardData;
}

const BoardOverviewPage: NextPage<Props> = ({ boards }: Props) => {
  const { dispatch: boardDispatch } = useContext(BoardContext);
  const router = useRouter();

  useEffect(() => {
    boardDispatch({
      type: BoardActions.PUT_BOARDS,
      payload: boards,
    });
  }, [boards]);

  return <BoardsList />;
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const token = getCookie('token', { req, res });
  try {
    if (typeof token === 'string') {
      httpService.setAuthToken(token);
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
