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
  try {
    const data = await fetchData(POPULAR_URL);
    resp.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get('/trending', async (req, resp) => {
  const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${apikey}`;
  try {
    const data = await fetchData(TRENDING_URL);
    resp.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get('/toprated', async (req, resp) => {
  const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
  try {
    const data = await fetchData(TOP_RATED_URL);
    resp.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get('/searched', async (req, resp) => {
  const movie = req.query.movie;
  const SEARCHED_URL = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${movie}&page=1&include_adult=false`;
  try {
    const data = await fetchData(SEARCHED_URL);
    resp.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

app.get('/banner', async (req, resp) => {
  const id = req.query.id;
  const MOVIE_BANNER_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`;
  try {
    const data = await fetchData(MOVIE_BANNER_URL);
    resp.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

const fetchData = async (url) => {
  console.log('fetching');
  const promise = await fetch(url);
  console.log(promise);
  const data = await promise.json();
  console.log(data);
  return data;
};

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
