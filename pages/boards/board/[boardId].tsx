import { useContext, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next/types';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

import { ColumnContext } from 'context/ColumnContext';
import { getColumns } from 'services/resources/request/column';
import { ColumnsContainer } from 'components/columns/columnsContainer';
import { withUser } from 'hoc/withUser';
import { httpService } from 'services/HttpService';
import { BaseResponse } from 'services/HttpService/types';
import { ColumnActions, Column } from 'services/resources/model/column.model';

interface Props {
  columns: Column[];
}

const BoardDetailPage: NextPage<Props> = ({ columns }) => {
  const { dispatch: columnDispatch } = useContext(ColumnContext);
  const router = useRouter();

  useEffect(() => {
    columnDispatch({
      type: ColumnActions.PUT_COLUMNS,
      payload: columns,
    });
  }, [columns]);

  return <ColumnsContainer />;
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  req,
  params,
}) => {
  const token = getCookie('token', { req, res });
  try {
    if (typeof token === 'string') {
      httpService.setAuthToken(token);
      // @note params type must be improved for getServerSideProps
      const { data }: BaseResponse<Column[]> = await getColumns(params.boardId);
      return {
        props: {
          columns: data,
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

export default withUser(BoardDetailPage);
