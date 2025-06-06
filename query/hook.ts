import { useQuery } from '@tanstack/react-query';
import { fecthRacesFromYear, fetchDriverByBroadcasterName, fetchDriverByNumber, fetchDrivers, fetchDriversBySessionKey, fetchPositionBySessionKey, fetchRaceSessions, fetchRadioBySessionKey, fetchSessionByKey } from './query';

export const useFetchRaceSessions = (meeting_key: string) => {
    return useQuery({
        queryKey: ['sessions', meeting_key],
        queryFn: () => fetchRaceSessions(meeting_key),
    });
};

export const useFetchSessionByKey = (session_key: string, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['session', session_key],
        queryFn: () => fetchSessionByKey(session_key),
        enabled: options?.enabled !== undefined ? options.enabled : Boolean(session_key),
    });
};

export const useFetchPositionBySessionKey = (session_key: string) => {
    return useQuery({
        queryKey: ['session_key', session_key],
        queryFn: () => fetchPositionBySessionKey(session_key),
    });
};

export const useFetchRacesFromYear = (year: number) => {
    return useQuery({
        queryKey: ['year', year],
        queryFn: () => fecthRacesFromYear(year),
    });
};

export const useFetchDrivers = () => {
    return useQuery({
        queryKey: ['drivers'],
        queryFn: () => fetchDrivers(),
    });
};

export const useFetchDriverByBroadcasterName = (broadcasterName: string) => {
    return useQuery({
        queryKey: ['driver', broadcasterName],
        queryFn: () => fetchDriverByBroadcasterName(broadcasterName),
    });
};

export const useFetchRadioBySessionKey = (session_key: string) => {
    return useQuery({
        queryKey: ['radio', session_key],
        queryFn: () => fetchRadioBySessionKey(session_key),
    });
};

export const useFetchDriverByNumber = (driver_number: number, session_key?: number) => {
    return useQuery({
        queryKey: ['driver_number', driver_number],
        queryFn: () => fetchDriverByNumber(driver_number, session_key),
        enabled: Boolean(driver_number),
    });
};

export const useFetchDriversBySessionKey = (session_key: string) => {
    return useQuery({
        queryKey: ['drivers_by_session_key', session_key],
        queryFn: () => fetchDriversBySessionKey(session_key)
    });
};