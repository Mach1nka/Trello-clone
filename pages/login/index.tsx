import { NextPage } from 'next/types';
import { useRouter } from 'next/router';

import { Authorization } from 'components/authorization';

const AuthorizationPage: NextPage = () => {
  const router = useRouter();

  return <Authorization />;
};

export default AuthorizationPage;
