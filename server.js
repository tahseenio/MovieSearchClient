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

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hi welcome to the TMDB API for tahseenio' });
});

app.get('/popular', async (req, res) => {
  const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`;
  await fetchData(POPULAR_URL, res);
});

app.get('/trending', async (req, res) => {
  const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${apikey}`;
  await fetchData(TRENDING_URL, res);
});

app.get('/toprated', async (req, res) => {
  const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
  await fetchData(TOP_RATED_URL, res);
});

app.get('/searched', async (req, res) => {
  const movie = req.query.movie;
  const SEARCHED_URL = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${movie}&page=1&include_adult=false`;
  await fetchData(SEARCHED_URL, res);
});

app.get('/banner', async (req, res) => {
  const id = req.query.id;
  const MOVIE_BANNER_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`;
  await fetchData(MOVIE_BANNER_URL, res);
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
