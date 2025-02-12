import { format } from 'date-fns';

export const formatDateTime = (date: string | number | Date): string =>
  format(new Date(date), 'PPpp');

export const getCurrentTimestamp = (): string => new Date().toISOString();
