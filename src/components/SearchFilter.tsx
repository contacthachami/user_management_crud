import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterText } from '../redux/userSlice';
import { RootState } from '../redux/store';

const SearchFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filterText = useSelector((state: RootState) => state.users.filterText);

  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder="Search users..."
        value={filterText}
        onChange={(e) => dispatch(setFilterText(e.target.value))}
      />
    </div>
  );
};

export default SearchFilter;