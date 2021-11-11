import { useContext } from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next/types';
import { useRouter } from 'next/router';

import { getBoards } from 'services/resources/request/board';
import { BoardContext } from 'context/BoardContext';
import { BoardsList } from 'components/boardList';
import { withUser } from 'hoc/withUser';
import { httpService } from 'services/HttpService';

const BoardOverviewPage: NextPage = ({ boards }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  console.log(boards);
  
  return <BoardsList />;
};

export const getStaticProps: GetStaticProps = async () => {
  const boards = await getBoards();

  return {
    props: {
      boards,
    },
  };
};

export default withUser(BoardOverviewPage);
