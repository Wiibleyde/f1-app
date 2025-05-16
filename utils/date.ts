import { RaceSession } from '@/query/hook';

export const getMonthThreeLetters = (date: string) => {
    return new Date(date).toLocaleString('en', { month: 'short' });
};

export const getDay = (date: string): string => {
    return new Date(date).getDate().toString().padStart(2, '0');
};

export const getLastDay = (date: string): string => {
    const lastDay = new Date(date);
    lastDay.setDate(lastDay.getDate() + 2);
    return lastDay.getDate().toString().padStart(2, '0');
};

export const formatDate = (item: RaceSession): string => {
    const startDate = new Date(item.date_start);
    const endDate = new Date(item.date_end);

    const startTime = startDate.toLocaleTimeString('en', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    const endTime = endDate.toLocaleTimeString('en', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return `${startTime} - ${endTime}`;
};

export function formatLastSessionDate(dateString: string | undefined): string {
    if (!dateString) return '';

    try {
        const date = new Date(dateString);

        // Options de formatage pour afficher la date
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };

        return date.toLocaleDateString(undefined, options);
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
}
