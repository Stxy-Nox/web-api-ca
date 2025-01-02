import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getGenres,
    getMovies,
    getPopular,
    getTrendings,
    getMovie,
    getPeople,
    getPresonCredits,
    getLanguages,
    getMovieImages,
    getPersonImages,
    getMovieReviews
  } from '../tmdb-api';

const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/tmdb/movies', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query;
    page = parseInt(page);

    if (isNaN(page) || page <= 0) {
        return res.status(400).json({ message: 'Invalid page parameter' });
    }
    const movies = await getMovies(page);
    res.status(200).json(movies);
}));

router.get('/tmdb/popularPeople', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query;
    page = parseInt(page);

    if (isNaN(page) || page <= 0) {
        return res.status(400).json({ message: 'Invalid page parameter' });
    }
    const popularPeople = await getPopular(page);
    res.status(200).json(popularPeople);
}));

router.get('/tmdb/trending', asyncHandler(async (req, res) => {
    const { timeWindow = "day" } = req.query;
    const trendings = await getTrendings(timeWindow);
    res.status(200).json(trendings);
}));


router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await getMovie(id);
    res.status(200).json(movie);
}));


router.get('/tmdb/person/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const person = await getPeople(id);
    res.status(200).json(person);
}));

router.get('/tmdb/person/:id/credits', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const credits = await getPresonCredits(id);
    res.status(200).json(credits);
}));


router.get('/tmdb/languages', asyncHandler(async (req, res) => {
    const languages = await getLanguages();
    res.status(200).json(languages);
}));


router.get('/tmdb/movie/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const images = await getMovieImages(id);
    res.status(200).json(images);
}));


router.get('/tmdb/person/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const images = await getPersonImages(id);
    res.status(200).json(images);
}));


router.get('/tmdb/movie/:id/reviews', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const reviews = await getMovieReviews(id);
    res.status(200).json(reviews);
}));
export default router;


