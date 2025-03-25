import { isToday, parseISO } from 'date-fns';


export function isBurningTask(date: string): boolean {
    const taskDate = parseISO(date);
    
    return isToday(taskDate);
}
