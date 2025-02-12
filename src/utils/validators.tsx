import { MINIMUM_NAME_LENGTH, MESSAGES } from './constants';

interface User {
  name: string;
}

export const isNameDuplicate = (users: User[], name: string): boolean => {
  return users.some(user => user.name.toLowerCase() === name.toLowerCase());
};

export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return MESSAGES.EMPTY_NAME;
  }
  if (name.length < MINIMUM_NAME_LENGTH) {
    return MESSAGES.NAME_TOO_SHORT;
  }
  return null;
};
