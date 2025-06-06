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