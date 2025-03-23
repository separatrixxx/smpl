import { format } from 'date-fns';


export function taskDateFormat(date: string): string {
  const parsedDate = new Date(date);

  return format(parsedDate, 'dd/MM');
}
