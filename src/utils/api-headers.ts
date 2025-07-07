export const getHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : undefined,
  };
};
