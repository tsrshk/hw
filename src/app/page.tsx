"use client";
import UserDirectoryTable from '@components/UserDirectoryTable';
import { useUsersQuery } from '../hooks/useUsersQuery';
import { useState, useCallback, useEffect } from 'react';
import Modal from '../components/Modal';
import { User } from '../types/user';

export default function Home() {
  const { users: loadedUsers, isLoading, isError } = useUsersQuery();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isLoading && loadedUsers.length) {
      setUsers(loadedUsers);
    }
  }, [isLoading, loadedUsers]);

  const handleRowClick = useCallback((user: User) => setSelectedUser(user), []);
  const handleCloseModal = () => setSelectedUser(null);
  const handleDeleteUser = useCallback((userId: number) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    if (selectedUser && selectedUser.id === userId) setSelectedUser(null);
  }, [selectedUser]);

  return (
    <div className="flex flex-col items-center py-10 px-2 md:px-8">
      <div className="w-full max-w-screen-2xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 tracking-tight">User Directory</h1>
        {isLoading && <div className="text-center py-12 text-lg text-gray-500">Loading...</div>}
        {isError && <div className="text-center py-12 text-lg text-red-500">Failed to load users</div>}
        {!isLoading && !isError && (
          <UserDirectoryTable users={users} onRowClick={handleRowClick} onDeleteUser={handleDeleteUser} />
        )}
      </div>
      <Modal isOpen={!!selectedUser} onClose={handleCloseModal}>
        {selectedUser && (
          <>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">{selectedUser.name}</h2>
            <div className="space-y-2 text-base text-gray-700">
              <div><span className="font-semibold text-gray-900">Username:</span> {selectedUser.username}</div>
              <div><span className="font-semibold text-gray-900">Email:</span> {selectedUser.email}</div>
              <div><span className="font-semibold text-gray-900">Phone:</span> {selectedUser.phone}</div>
              <div><span className="font-semibold text-gray-900">Website:</span> <a href={`http://${selectedUser.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900 transition">{selectedUser.website}</a></div>
              <div><span className="font-semibold text-gray-900">Company:</span> {selectedUser.company.name}</div>
              <div><span className="font-semibold text-gray-900">Address:</span> <a href={`https://www.google.com/maps?q=${selectedUser.address.geo.lat},${selectedUser.address.geo.lng}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline hover:text-blue-900 transition">{selectedUser.address.street}, {selectedUser.address.suite}, {selectedUser.address.city}, {selectedUser.address.zipcode}</a></div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}