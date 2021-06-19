import { useEffect, useState } from 'react';
import { getUsers, User } from '../src/api/user-requests';

const useFetchUsers = (userName: string): User[] => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersArr: User[] = await getUsers(userName);
        if (usersArr) {
          setData(usersArr);
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
    setData([]);
  }, [userName]);
  return data;
};

export default useFetchUsers;
