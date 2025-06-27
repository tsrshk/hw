import { useEffect, useState } from 'react';
import { fetchUsers } from '../api/users';
import { User } from '../types/user';

export const useUsersQuery = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return { users, isLoading, isError };
}; 