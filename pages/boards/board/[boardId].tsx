import { useContext, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next/types';
import { getCookie } from 'cookies-next';

import { CardContext } from 'context/CardContext';
import { ColumnContext } from 'context/ColumnContext';
import { getCards } from 'services/resources/request/card';
import { getColumns } from 'services/resources/request/column';
import { ColumnsContainer } from 'components/columns/columnsContainer';
import { withUser } from 'hoc/withUser';
import { httpService } from 'services/HttpService';
import { BaseResponse } from 'services/HttpService/types';
import { ColumnActions, Column } from 'services/resources/model/column.model';
import {
  CardActions,
  CardDataServer,
} from 'services/resources/model/card.model';
import { getRouterQuery } from 'utils/getRouterQuery';
import { AuthData } from 'services/resources/model/auth.model';

interface Props {
  columns: Column[];
  cards: CardDataServer[];
}

const BoardDetailPage: NextPage<Props> = ({ columns, cards }) => {
  const { dispatch: columnDispatch } = useContext(ColumnContext);
  const { dispatch: cardDispatch } = useContext(CardContext);

  useEffect(() => {
    columnDispatch({
      type: ColumnActions.PUT_COLUMNS,
      payload: columns,
    });
    cards.map((el) => {
      cardDispatch({ type: CardActions.PUT_CARDS, payload: el });
    });
  }, [columns, cards]);

  return <ColumnsContainer />;
};

export const getServerSideProps: GetServerSideProps = async ({
  res,
  req,
  params,
}) => {
  const authDataJson = getCookie('authData', { req, res });
  const authData: AuthData | null =
    authDataJson && JSON.parse(authDataJson.toString());

  try {
    if (authData) {
      httpService.setAuthToken(authData.token);
      // @note params type must be improved for getServerSideProps
      const { data: columns }: BaseResponse<Column[]> = await getColumns(
        getRouterQuery(params, 'boardId')
      );

      const cardsForAllColumns: BaseResponse<CardDataServer>[] =
        await Promise.all(columns.map((el) => getCards(el.id)));
      const cardsData = cardsForAllColumns.map(
        (el: BaseResponse<CardDataServer>) => el.data
      );

      return {
        props: {
          columns,
          cards: cardsData,
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
