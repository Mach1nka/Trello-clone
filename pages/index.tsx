import { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Typography } from '@material-ui/core';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('login');
  }, []);

  return <></>;
};

export default Home;
