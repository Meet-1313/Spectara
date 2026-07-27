import express from "express";
import {
        trendingMovies,
        popularMovies,
        searchMovie,
        movieDetails,
        nowPlayingMovies,
        topRatedMovies,
        upcomingMovies,
        watchProviders,
        movieCredits,
        similarMovies,
        movieTrailers
    } from "../controllers/movieController.js";

const router = express.Router();
router.get("/trending", trendingMovies);
router.get("/popular", popularMovies);
router.get("/search", searchMovie);
router.get("/now-playing", nowPlayingMovies);
router.get("/top-rated", topRatedMovies);
router.get("/upcoming", upcomingMovies);
router.get('/:id/watch-providers',watchProviders);
router.get('/:id/credits',movieCredits);
router.get('/:id/similar',similarMovies);
router.get('/:id/trailers',movieTrailers);
router.get("/:id", movieDetails);
export default router;