import React from 'react';
import { formatDateTime } from '../utils/dateUtils';
import ErrorMessage from './ErrorMessage';

interface User {
  id: number;
  name: string;
  createdAt: string;
  lastModified: string;
}

interface UserListItemProps {
  user: User;
  isEditing: boolean;
  editName: string;
  error: string;
  isSelected: boolean;
  onEdit: (user: User) => void;
  onUpdate: () => void;
  onCancel: () => void;
  onDelete: (userId: number) => void;
  onToggleSelect: () => void;
  onEditNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  isEditing,
  editName,
  error,
  isSelected,
  onEdit,
  onUpdate,
  onCancel,
  onDelete,
  onToggleSelect,
  onEditNameChange,
}) => (
  <div className="list-group-item">
    {isEditing ? (
      <div>
        <div className="input-group">
          <input
            type="text"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            value={editName}
            onChange={onEditNameChange}
          />
          <button className="btn btn-success" onClick={onUpdate}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
        <ErrorMessage message={error} />
      </div>
    ) : (
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            className="form-check-input me-3"
            checked={isSelected}
            onChange={onToggleSelect}
          />
          <div>
            <div>{user.name}</div>
            <small className="text-muted">
              Created: {formatDateTime(user.createdAt)}
              <br />
              Last modified: {formatDateTime(user.lastModified)}
            </small>
          </div>
        </div>
        <div>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => onEdit(user)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(user.id)}
          >
            Delete
          </button>
        </div>
      </div>
    )}
  </div>
);

export default UserListItem;
