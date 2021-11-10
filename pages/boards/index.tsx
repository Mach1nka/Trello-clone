import { NextPage } from 'next/types';
import { useRouter } from 'next/router';

import { withUser } from 'hoc/withUser';

const BoardOverviewPage: NextPage = () => {
  const router = useRouter();

  return <></>;
};

export default withUser(BoardOverviewPage);
