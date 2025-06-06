import { Driver, PositionResult, Race, RaceSession, RadioData } from "@/types";

export const fecthRacesFromYear = async (year: number): Promise<Race[]> => {
    const response = await fetch(`https://api.openf1.org/v1/meetings?year=${year}`);
    let data = await response.json();
    if (!data || data.length === 0) {
        return [];
    }
    data = data.reverse();
    return data;
};

export const fetchDrivers = async (): Promise<Driver[]> => {
    const sessionsRes = await fetch('https://api.openf1.org/v1/sessions?session_type=Race');
    const sessions = await sessionsRes.json();
    if (!sessions || sessions.length === 0) {
        return [];
    }
    sessions.sort(
        (a: { date_start: string }, b: { date_start: string }) =>
            new Date(b.date_start).getTime() - new Date(a.date_start).getTime()
    );
    const lastRaceSessionKey = sessions[0].session_key;

    // 2. Récupérer les pilotes de cette session
    const driversRes = await fetch(`https://api.openf1.org/v1/drivers?session_key=${lastRaceSessionKey}`);
    const drivers: Driver[] = await driversRes.json();

    const uniqueDriversMap = new Map<string, Driver>();
    drivers.forEach((driver) => {
        const key = `${driver.broadcast_name}_${driver.team_name}`;
        if (!uniqueDriversMap.has(key)) {
            uniqueDriversMap.set(key, driver);
        }
    });

    return Array.from(uniqueDriversMap.values());
};

export const fetchRaceSessions = async (meeting_key: string): Promise<RaceSession[]> => {
    const response = await fetch(`https://api.openf1.org/v1/sessions?meeting_key=${meeting_key}`);
    return response.json();
};

export const fetchSessionByKey = async (session_key: string): Promise<RaceSession | null> => {
    const response = await fetch(`https://api.openf1.org/v1/sessions?session_key=${session_key}`);
    const sessions = await response.json();
    if (!sessions || sessions.length === 0) {
        return null;
    }
    return sessions[0];
};

export const fetchDriverByBroadcasterName = async (broadcasterName: string): Promise<Driver | null> => {
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

export const fetchPositionBySessionKey = async (session_key: string): Promise<PositionResult[]> => {
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

export const fetchRadioBySessionKey = async (session_key: string): Promise<RadioData[]> => {
    const response = await fetch(`https://api.openf1.org/v1/team_radio?session_key=${session_key}`);
    const radioData: RadioData[] = await response.json();

    return radioData;
};

export const fetchDriverByNumber = async (driver_number: number, session_key?: number): Promise<Driver | null> => {
    const response = await fetch(`https://api.openf1.org/v1/drivers?driver_number=${driver_number}${session_key ? `&session_key=${session_key}` : ''}`);
    const drivers: Driver[] = await response.json();
    return drivers.length > 0 ? drivers[0] : null;
}

export const fetchDriversBySessionKey = async (session_key: string): Promise<Driver[]> => {
    const response = await fetch(`https://api.openf1.org/v1/drivers?session_key=${session_key}`);
    const drivers: Driver[] = await response.json();
    return drivers;
};