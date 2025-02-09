import { useState, useEffect, Suspense, useRef } from "react";
import axios from "axios";
import { Link, Outlet, useParams } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const location = useLocation();
    const backLinkRef = useRef(location.state);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
            const options = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODM1OWJhOGI4MzIxODY2ZTZiYzg1OGRjNDFkNjVhYSIsInN1YiI6IjY1ZWI0ODdkNjY3NTFkMDE4NmFlMjg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p-a75sYlidx_38396SjbEmJjRCLXYZeKf-WXyhemqsI'
                }
            };

            try {
                const response = await axios.get(url, options);
                setMovieDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    const makeLinkClass = ({ isActive }) => {
        return clsx(css.link, isActive && css.active);
    };

    return (
        <div className={css.container}>
            {movieDetails && (
                <>
                    <Link to={backLinkRef.current} className={css.backLink}>
                        <h3>Go Back</h3>
                    </Link>
                    <hr />
                    <div className={css.details}>
                        {movieDetails.poster_path && (
                            <img
                                className={css.pic}
                                src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                                alt={movieDetails.title}
                            />
                        )}
                        <div className={css.details2}>
                            <h1>{movieDetails.title}</h1>
                            <h2>User Score:</h2>
                            <p>{movieDetails.vote_average}</p>
                            <h2>Overview:</h2>
                            <p>{movieDetails.overview}</p>
                            <h2>Genres:</h2>
                            <p>{movieDetails.genres.map(genre => genre.name).join(", ")}</p>
                        </div>
                    </div>
                    <hr />
                    <ul className={css.extra}>
                        <li>
                            <NavLink className={makeLinkClass} to="reviews">Reviews</NavLink>
                        </li>
                        <li>
                            <NavLink className={makeLinkClass} to="cast">Cast</NavLink>
                        </li>
                    </ul>
                    <hr />

                    <Suspense fallback={<h2>LOADING MORE DETAILS...</h2>}>
                        <Outlet />
                    </Suspense>
                </>
            )}
        </div>
    );
}