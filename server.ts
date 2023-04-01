import { port, apikey } from './config.js';
import fetch from 'node-fetch';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
export const app: Express = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.options('*', cors());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hi welcome to the TMDB API for tahseenio' });
});

app.get('/popular', async (req: Request, res: Response) => {
  const POPULAR_URL: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`;
  await fetchData(POPULAR_URL, res);
});

app.get('/trending', async (req: Request, res: Response) => {
  const TRENDING_URL: string = `https://api.themoviedb.org/3/trending/all/day?api_key=${apikey}`;
  await fetchData(TRENDING_URL, res);
});

app.get('/toprated', async (req: Request, res: Response) => {
  const TOP_RATED_URL: string = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
  await fetchData(TOP_RATED_URL, res);
});

app.get('/searched', async (req: Request, res: Response) => {
  const movie: string = req.query.movie as string;
  const SEARCHED_URL: string = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${movie}&page=1&include_adult=false`;
  await fetchData(SEARCHED_URL, res);
});

app.get('/banner', async (req: Request, res: Response) => {
  const id: string = req.query.id as string;
  const MOVIE_BANNER_URL: string = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`;
  await fetchData(MOVIE_BANNER_URL, res);
});

const fetchData = async (url: string, response: Response) => {
  try {
    const promise = await fetch(url);
    const data = await promise.json();
    response.status(200).json(data);
  } catch (e) {
    response.status(404).send(e as Error);
  }
};

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
