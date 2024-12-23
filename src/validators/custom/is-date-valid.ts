import { isValid, parseISO } from 'date-fns';

export const isDateValid = (value: string): boolean => {
  const parsedDate = parseISO(value);

  if (!isValid(parsedDate)) {
    throw new Error('Date does not exist');
  }

  return true;
}
