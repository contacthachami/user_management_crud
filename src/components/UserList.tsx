import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  deleteUser,
  updateUser,
  toggleUserSelection,
  deleteSelectedUsers,
  setSortOrder,
} from '../redux/userSlice';
import { isNameDuplicate, validateName } from '../utils/validators';
import { MESSAGES } from '../utils/constants';
import UserListHeader from './UserListHeader';
import UserListItem from './UserListItem';
import { RootState } from '../redux/store';

const UserList: React.FC = () => {
  const { users, selectedUsers, sortOrder, filterText } = useSelector(
    (state: RootState) => state.users
  );
  const dispatch = useDispatch();
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');

  const handleEdit = (user: { id: number; name: string }) => {
    setEditId(user.id);
    setEditName(user.name);
    setError('');
  };

  const handleUpdate = () => {
    setError('');

    const validationError = validateName(editName);
    if (validationError) {
      setError(validationError);
      return;
    }

    const otherUsers = users.filter((user) => user.id !== editId);
    if (isNameDuplicate(otherUsers, editName)) {
      setError(MESSAGES.DUPLICATE_NAME);
      return;
    }

    dispatch(updateUser({ id: editId!, name: editName }));
    toast.success(MESSAGES.UPDATE_SUCCESS);
    setEditId(null);
    setEditName('');
  };

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId));
    toast.success(MESSAGES.DELETE_SUCCESS);
  };

  const handleDeleteSelected = () => {
    if (window.confirm(MESSAGES.DELETE_CONFIRMATION)) {
      dispatch(deleteSelectedUsers());
      toast.success(MESSAGES.BULK_DELETE_SUCCESS);
    }
  };

  const sortedAndFilteredUsers = [...users]
    .filter((user) => user.name.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div>
      <UserListHeader
        selectedCount={selectedUsers.length}
        sortOrder={sortOrder}
        onDeleteSelected={handleDeleteSelected}
        onSort={() => dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))}
      />

      <div className="list-group">
        {sortedAndFilteredUsers.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            isEditing={editId === user.id}
            editName={editName}
            error={error}
            isSelected={selectedUsers.includes(user.id)}
            onEdit={handleEdit}
            onUpdate={handleUpdate}
            onCancel={() => {
              setEditId(null);
              setEditName('');
              setError('');
            }}
            onDelete={handleDelete}
            onToggleSelect={() => dispatch(toggleUserSelection(user.id))}
            onEditNameChange={(e) => {
              setEditName(e.target.value);
              setError('');
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
