import React from 'react';

interface UserListHeaderProps {
  selectedCount: number;
  sortOrder: 'asc' | 'desc';
  onDeleteSelected: () => void;
  onSort: () => void;
}

const UserListHeader: React.FC<UserListHeaderProps> = ({
  selectedCount,
  sortOrder,
  onDeleteSelected,
  onSort,
}) => (
  <div className="mb-3 d-flex justify-content-between align-items-center">
    <button
      className="btn btn-danger"
      disabled={selectedCount === 0}
      onClick={onDeleteSelected}
    >
      Delete Selected ({selectedCount})
    </button>
    <button className="btn btn-secondary" onClick={onSort}>
      Sort {sortOrder === 'asc' ? '↑' : '↓'}
    </button>
  </div>
);

export default UserListHeader;
