import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
import NotFoundPage from "../NothingFoundPoster/NothingFound.png";

export default function MovieList ({movies}) {
    const location = useLocation();
    const baseImageUrl = "https://image.tmdb.org/t/p/w500"; 

    return (
        <ul className={css.list}>
            {movies.map(movie => (
                <li className={css.item} key={movie.id}>
                    <Link className={css.link} to={`/movies/${movie.id}`} state={location}>
                    <img
                    src={movie.poster_path ? `${baseImageUrl}${movie.poster_path}` :NotFoundPage}
                    alt={movie.title}
                    className={css.poster} />
                        <span className={css.title}>{movie.title}</span>
                    </Link>
                    <hr />
            </li>))}
        </ul>
    );
}