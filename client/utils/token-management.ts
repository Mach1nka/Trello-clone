const saveToken = (token: string): void => {
  localStorage.setItem('token', JSON.stringify(token));
};

const getToken = (): null | string => {
  const token = localStorage.getItem('token');
  if (token === null) return null;
  return JSON.parse(token) as string;
};

const clearToken = (): void => {
  localStorage.removeItem('token');
};

export { saveToken, getToken, clearToken };
