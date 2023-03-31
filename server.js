const { port, apikey } = require('./config.js');
const fetch = require('node-fetch');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.options('*', cors());

app.get('/', (req, resp) => {
  resp
    .status(200)
    .json({ message: 'Hi welcome to the TMDB API for tahseenio' });
});

app.get('/popular', async (req, resp) => {
  const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`;
  await fetchData(POPULAR_URL, resp);
});

app.get('/trending', async (req, resp) => {
  const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${apikey}`;
  await fetchData(TRENDING_URL, resp);
});

app.get('/toprated', async (req, resp) => {
  const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
  await fetchData(TOP_RATED_URL, resp);
});

app.get('/searched', async (req, resp) => {
  const movie = req.query.movie;
  const SEARCHED_URL = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${movie}&page=1&include_adult=false`;
  await fetchData(SEARCHED_URL, resp);
});

app.get('/banner', async (req, resp) => {
  const id = req.query.id;
  const MOVIE_BANNER_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`;
  await fetchData(MOVIE_BANNER_URL, resp);
});

const fetchData = async (url, response) => {
  try {
    const promise = await fetch(url);
    const data = await promise.json();
    response.status(200).json(data);
  } catch (e) {
    response.status(404).send(e);
  }
};

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
