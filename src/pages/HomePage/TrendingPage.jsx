import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import css from "./TrendingPage.module.css"

export default function TrendingPage() {
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const [page, setPage] = useState(1);
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        const fetchMovies = async (page) => {
            const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
            const options = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODM1OWJhOGI4MzIxODY2ZTZiYzg1OGRjNDFkNjVhYSIsInN1YiI6IjY1ZWI0ODdkNjY3NTFkMDE4NmFlMjg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p-a75sYlidx_38396SjbEmJjRCLXYZeKf-WXyhemqsI'
                }
            };

            try {
                const response = await axios.get(url, options);
                const fetchedMovies = page === 3 ? response.data.results.slice(0, 10) : response.data.results;
                if (page === 1) {
                    setMovies(fetchedMovies);
                } else {
                    setMovies(prevMovies => [...prevMovies, ...fetchedMovies]);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchMovies(page);
    }, [page]);

    const loadMoreMovies = () => {
        if (page < 3) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <>
            <h1 className={css.pageTitle} id="trending">Trending today</h1>
            <ul className={css.list}>
                {movies.map(movie => (
                    <div className={css.aas} key={movie.id}>
                        <li className={css.item} key={movie.id}>
                            <Link className={css.eight} to={`/movies/${movie.id}`} state={location}>
                                <img className={css.pic} src={`${imageBaseUrl}${movie.poster_path}`} alt={`${movie.title} poster`} />
                                {movie.title}
                            </Link>
                            <hr />
                        </li>
                    </div>
                ))}
            </ul>
            {page < 3 ? (
                <button className={css.button} onClick={loadMoreMovies}>Load More</button>
            ) : (
                <a href="#trending" className={css.buttonTop}>Back on top</a>
            )}
        </>
    );
}