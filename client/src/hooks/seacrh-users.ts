import { useEffect, useState } from 'react';

import { searchUsers } from '../service/resources/requests/user';
import { SearchedUser } from '../service/resources/models/user.model';
import { BaseResponse } from '../service/httpService/types';

const useFetchUsers = (userName: string): SearchedUser[] => {
  const [data, setData] = useState<SearchedUser[]>([]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: BaseResponse<SearchedUser[]> = await searchUsers(userName);
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
