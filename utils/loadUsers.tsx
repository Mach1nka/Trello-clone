import { useEffect, useState } from 'react';

import { getUsers } from 'services/resources/request/user';
import { User } from 'services/resources/model/user.model';
import { BaseResponse } from 'services/HttpService/types';

export const useLoadUsers = (userName: string): User[] => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: BaseResponse<User[]> = await getUsers(userName);
        setData(res.data);
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
