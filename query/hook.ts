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

const fecthRacesFromYear = async (year: number): Promise<Race[]> => {
  const response = await fetch(`https://api.openf1.org/v1/meetings?year=${year}`);
  return response.json();
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

const fetchRaceSessions = async (meeting_key: string): Promise<any> => {
  const response = await fetch(`https://api.openf1.org/v1/sessions?meeting_key=${meeting_key}`);
  return response.json();
}

export const useFetchRaceSessions = (meeting_key: string) => {
  return useQuery({
    queryKey: ['sessions', meeting_key],
    queryFn: () => fetchRaceSessions(meeting_key),
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
