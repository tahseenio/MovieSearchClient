import dotenv from 'dotenv';
dotenv.config();

export const apikey: string | undefined = process.env.API_KEY;
export const port: string | number | undefined = process.env.PORT || 3000;
