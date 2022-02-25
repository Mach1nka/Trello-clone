import { useEffect, useState } from 'react';
import { getUsers, User, UsersResponse } from '../src/api/user-requests';

const useFetchUsers = (userName: string): User[] => {
  const [data, setData] = useState<User[]>([]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: UsersResponse = await getUsers(userName);
        if (res.statusCode === 200) {
          setData(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (userName) {
      const timer = setTimeout(() => {
        fetchData();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [userName]);
  return data;
};

export default useFetchUsers;
