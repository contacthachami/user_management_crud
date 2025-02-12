import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addUser } from '../redux/userSlice';
import { isNameDuplicate, validateName } from '../utils/validators';
import { MESSAGES } from '../utils/constants';
import ErrorMessage from './ErrorMessage';
import { RootState } from '../redux/store';

const UserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (isNameDuplicate(users, name)) {
      setError(MESSAGES.DUPLICATE_NAME);
      return;
    }

    dispatch(addUser(name));
    setName('');
    toast.success('User added successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError('');
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-grow">
          <input
            type="text"
            className={`form-control w-full px-3 py-2 text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
          />
          <ErrorMessage message={error} />
        </div>
        <button type="submit" className="btn btn-primary px-4 py-2 text-sm">
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserForm;