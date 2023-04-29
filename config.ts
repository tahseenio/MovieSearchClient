import dotenv from 'dotenv';
dotenv.config();

export const apikey: string = process.env.API_KEY!;
export const port: string | number = process.env.PORT! || 3000;
