import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
      <ExclamationCircleIcon className="h-5 w-5" />
      {message}
    </div>
  );
};

export default ErrorMessage;
