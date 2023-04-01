var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { port, apikey } from './config.js';
import fetch from 'node-fetch';
import cors from 'cors';
import express from 'express';
export const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cors());
app.options('*', cors());
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hi welcome to the TMDB API for tahseenio' });
});
app.get('/popular', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`;
    yield fetchData(POPULAR_URL, res);
}));
app.get('/trending', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TRENDING_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${apikey}`;
    yield fetchData(TRENDING_URL, res);
}));
app.get('/toprated', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
    yield fetchData(TOP_RATED_URL, res);
}));
app.get('/searched', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = req.query.movie;
    const SEARCHED_URL = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${movie}&page=1&include_adult=false`;
    yield fetchData(SEARCHED_URL, res);
}));
app.get('/banner', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const MOVIE_BANNER_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}&language=en-US`;
    yield fetchData(MOVIE_BANNER_URL, res);
}));
const fetchData = (url, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const promise = yield fetch(url);
        const data = yield promise.json();
        response.status(200).json(data);
    }
    catch (e) {
        response.status(404).send(e);
    }
});
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
//# sourceMappingURL=server.js.map