import { FC, useEffect, useRef } from 'react';
import { User } from '../types/user';

type UserPopupProps = {
  user: User;
  onClose: () => void;
};

const UserPopup: FC<UserPopupProps> = ({ user, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Фокус на попапе при открытии
  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  // Клик вне попапа
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div
        ref={dialogRef}
        className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative outline-none focus:ring-2 focus:ring-blue-500"
        tabIndex={0}
      >
        <button
          onClick={onClose}
          aria-label="Close popup"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">{user.name}</h2>
        <div className="space-y-2 text-sm">
          <div><span className="font-semibold">Username:</span> {user.username}</div>
          <div><span className="font-semibold">Email:</span> {user.email}</div>
          <div><span className="font-semibold">Phone:</span> {user.phone}</div>
          <div><span className="font-semibold">Website:</span> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{user.website}</a></div>
          <div><span className="font-semibold">Company:</span> {user.company.name}</div>
          <div><span className="font-semibold">Address:</span> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</div>
        </div>
      </div>
    </div>
  );
};

export default UserPopup; 