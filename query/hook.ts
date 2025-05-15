import { useQuery } from '@tanstack/react-query';

export type Race = {
    circuit_key: number;
    circuit_short_name: string;
    country_code: string;
    country_key: number;
    country_name: string;
    date_start: string;
    gmt_offset: string;
    location: string;
    meeting_key: number;
    meeting_name: string;
    meeting_official_name: string;
    year: number;
};

export type Driver = {
    broadcast_name: string;
    country_code: string;
    driver_number: number;
    first_name: string;
    full_name: string;
    headshot_url: string;
    last_name: string;
    meeting_key: number;
    name_acronym: string;
    session_key: number;
    team_colour: string;
    team_name: string;
};

export type RaceSession = {
    meeting_key: number;
    session_key: number;
    location: string;
    date_start: string;
    date_end: string;
    session_type: string;
    session_name: string;
    country_key: number;
    country_code: string;
    country_name: string;
    circuit_key: number;
    circuit_short_name: string;
    gmt_offset: string;
    year: number;
};

export type PositionResult = {
    date: string;
    session_key: number;
    meeting_key: number;
    driver_number: number;
    position: number;
};

export type RadioData = {
    meeting_key: number;
    session_key: number;
    driver_number: number;
    date: string;
    recording_url: string;
};

const fecthRacesFromYear = async (year: number): Promise<Race[]> => {
    const response = await fetch(`https://api.openf1.org/v1/meetings?year=${year}`);
    let data = await response.json();
    if (!data || data.length === 0) {
        return [];
    }
    data = data.reverse();
    return data
};

const fetchDrivers = async (): Promise<Driver[]> => {
    const response = await fetch('https://api.openf1.org/v1/drivers');
    const drivers = await response.json();

    const sortedDrivers = [...drivers].sort((a, b) => b.session_key - a.session_key);

    const uniqueDriversMap = new Map<string, Driver>();

    sortedDrivers.forEach((driver) => {
        if (!uniqueDriversMap.has(driver.broadcast_name)) {
            uniqueDriversMap.set(driver.broadcast_name, driver);
        }
    });

    return Array.from(uniqueDriversMap.values());
};

const fetchRaceSessions = async (meeting_key: string): Promise<RaceSession[]> => {
    const response = await fetch(`https://api.openf1.org/v1/sessions?meeting_key=${meeting_key}`);
    return response.json();
};

export const useFetchRaceSessions = (meeting_key: string) => {
    return useQuery({
        queryKey: ['sessions', meeting_key],
        queryFn: () => fetchRaceSessions(meeting_key),
    });
};

const fetchSessionByKey = async (session_key: string): Promise<RaceSession | null> => {
    const response = await fetch(`https://api.openf1.org/v1/sessions?session_key=${session_key}`);
    const sessions = await response.json();
    if (!sessions || sessions.length === 0) {
        return null;
    }
    return sessions[0];
}

export const useFetchSessionByKey = (session_key: string, options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: ['session', session_key],
        queryFn: () => fetchSessionByKey(session_key),
        enabled: options?.enabled !== undefined ? options.enabled : Boolean(session_key),
    });
};

const fetchDriverByBroadcasterName = async (broadcasterName: string): Promise<Driver | null> => {
    const response = await fetch(`https://api.openf1.org/v1/drivers?broadcast_name=${broadcasterName}`);
    const drivers = await response.json();

    if (!drivers || drivers.length === 0) {
        return null;
    }

    // Sort by session_key to get the most recent data first
    const sortedDrivers = [...drivers].sort((a, b) => b.session_key - a.session_key);

    // Find all drivers with the requested broadcast_name
    const matchingDrivers = sortedDrivers.filter((driver) => driver.broadcast_name === broadcasterName);

    if (matchingDrivers.length === 0) {
        return null;
    }

    // Start with the first driver as base
    const mergedDriver = { ...matchingDrivers[0] };

    // Create a complete driver object by taking the first non-null value for each property
    for (const driver of matchingDrivers) {
        Object.keys(driver).forEach((key) => {
            if (mergedDriver[key] === null || mergedDriver[key] === undefined) {
                mergedDriver[key] = driver[key];
            }
        });
    }

    return mergedDriver;
};

const fetchPositionBySessionKey = async (session_key: string): Promise<PositionResult[]> => {
    const response = await fetch(`https://api.openf1.org/v1/position?session_key=${session_key}`);
    const positions: PositionResult[] = await response.json();

    // Pour chaque pilote, garder la position la plus récente (date la plus grande)
    const latestPositionsMap = new Map<number, PositionResult>();
    positions.forEach((pos) => {
        const current = latestPositionsMap.get(pos.driver_number);
        if (!current || new Date(pos.date) > new Date(current.date)) {
            latestPositionsMap.set(pos.driver_number, pos);
        }
    });

    // Retourner un tableau trié par position croissante
    const uniquePositions = Array.from(latestPositionsMap.values()).sort((a, b) => a.position - b.position);

    return uniquePositions;
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

const fetchRadioBySessionKey = async (session_key: string): Promise<RadioData[]> => {
    const response = await fetch(`https://api.openf1.org/v1/team_radio?session_key=${session_key}`);
    const radioData: RadioData[] = await response.json();

    return radioData;
}

export const useFetchRadioBySessionKey = (session_key: string) => {
    return useQuery({
        queryKey: ['radio', session_key],
        queryFn: () => fetchRadioBySessionKey(session_key),
    });
};