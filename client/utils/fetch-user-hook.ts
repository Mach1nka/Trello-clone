import { useEffect, useState } from 'react';
import { getUsers, User } from '../src/api/user-requests';

const useFetchUsers = (): User[] => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersArr: User[] = await getUsers();
      setData(usersArr);
    };
    fetchData();
  }, []);

  return data;
};

export default useFetchUsers;
