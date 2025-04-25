import { useQuery } from "@tanstack/react-query"

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
}

export const fecthRacesFromYear = async (year: number): Promise<Race[]> => {
    const response = await fetch(`https://api.openf1.org/v1/meetings?year=${year}`)
    return response.json()
}

export const useFetchRacesFromYear = (year: number) => {
    return useQuery({
        queryKey: ['year', year],
        queryFn: () => fecthRacesFromYear(year),
    })
}