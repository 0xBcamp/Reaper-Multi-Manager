export const CURRENT_UNIX_TIME = Math.floor(Date.now() / 1000); // Current Unix timestamp
export const TIMESTAMP_ONE_MONTH_AGO = Math.floor((Date.now() - (30 * 24 * 60 * 60 * 1000)) / 1000); // One month ago in Unix timestamp
export const ONE_UNIX_YEAR = 31536000 ; // One year in Unix time
export const defaultStdDevThreshold = 1.8; // Default value