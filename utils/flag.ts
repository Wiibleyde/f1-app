export const getFlagEmoji = (countryCode: string | null) => {
    // Return empty string if countryCode is null or undefined
    if (!countryCode) {
        return '';
    }

    // Convert 3-letter country codes to 2-letter ISO codes
    const countryCodeMapping: Record<string, string> = {
        NED: 'NL', // Netherlands
        GBR: 'GB', // Great Britain
        GER: 'DE', // Germany
        MON: 'MC', // Monaco
        FRA: 'FR', // France
        ESP: 'ES', // Spain
        MEX: 'MX', // Mexico
        AUS: 'AU', // Australia
        CAN: 'CA', // Canada
        THA: 'TH', // Thailand
        JPN: 'JP', // Japan
        CHN: 'CN', // China
        FIN: 'FI', // Finland
        DEN: 'DK', // Denmark
        ITA: 'IT', // Italy
        USA: 'US', // United States
        ARG: 'AR', // Argentina
        BRA: 'BR', // Brazil
    };

    const isoCode = countryCodeMapping[countryCode] || countryCode;

    if (isoCode.length !== 2) {
        return '';
    }

    const codePoints = isoCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};
