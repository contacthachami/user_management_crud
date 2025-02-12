export const MINIMUM_NAME_LENGTH = 3;
export const TOAST_POSITION: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'bottom-right';
export const TOAST_AUTO_CLOSE = 3000;

export const MESSAGES = {
  EMPTY_NAME: 'Name cannot be empty',
  NAME_TOO_SHORT: `Name must be at least ${MINIMUM_NAME_LENGTH} characters long`,
  DUPLICATE_NAME: 'This name already exists!',
  UPDATE_SUCCESS: 'User updated successfully!',
  DELETE_SUCCESS: 'User deleted successfully!',
  BULK_DELETE_SUCCESS: 'Selected users deleted successfully!',
  DELETE_CONFIRMATION: 'Are you sure you want to delete selected users?',
};
