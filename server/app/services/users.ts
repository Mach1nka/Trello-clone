import User from '../models/user';

interface SearchUser {
  id: string;
  login: string;
}

async function getUsersService(searchValue: string, userId: string): Promise<SearchUser[]> {
  const regex = new RegExp(searchValue);
  const allUsers = await User.find({ login: { $regex: regex, $options: 'i' } });

  const filteredUsers = allUsers.filter((el) => el._id.toString() !== userId.toString());

  const preparedData = filteredUsers.map((el) => ({
    id: el._id,
    login: el.login
  }));

  return preparedData;
}

export default getUsersService;
