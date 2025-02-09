import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { Suspense } from 'react';
import  Navigation  from './components/Navigation/Navigation';

const HomePage = lazy(() => import("./pages/HomePage/TrendingPage"))
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"))
const RandomMoviePage = lazy(() => import("./pages/RandomMoviePage/RandomMoviePage"))
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"))
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"))
const MovieReviews = lazy(() => import("./components/MovieReviews/MovieReviews"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"))

export default function App() {
  return (
    <div>
      <Navigation />

      <Suspense fallback={<h1>LOADING PAGE...</h1>}>      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/random" element={<RandomMoviePage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="/movies/:movieId/cast" element={<MovieCast />} />
            <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}