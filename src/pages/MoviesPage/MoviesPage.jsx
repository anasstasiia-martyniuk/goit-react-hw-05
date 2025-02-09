import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import css from "./MoviesPage.module.css";
import noPoster from "../../components/NothingFoundPoster/NothingFound.png";

export default function MoviesPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [params, setParams] = useSearchParams();
    const searchTerm = params.get("search") ?? "";
    const location = useLocation();
    const baseImageUrl = "https://image.tmdb.org/t/p/w500"; 

    const changeSearch = (newSearch) => {
        params.set("search", newSearch);
        setParams(params);
        handleSearch(newSearch); 
    };

    const handleSearch = async (query) => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1&include_adult=false`;
        const options = {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODM1OWJhOGI4MzIxODY2ZTZiYzg1OGRjNDFkNjVhYSIsInN1YiI6IjY1ZWI0ODdkNjY3NTFkMDE4NmFlMjg0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p-a75sYlidx_38396SjbEmJjRCLXYZeKf-WXyhemqsI'
            }
        };

        try {
            const response = await axios.get(url, options);
            setSearchResults(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            handleSearch(searchTerm); 
        }
    }, [searchTerm]);

    return (
        <>
            <form className={css.searchForm} onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search movies"
                    value={searchTerm}
                    onChange={(e) => changeSearch(e.target.value)}
                    className={css.searchInput}
                />
                <span>🔍</span>
            </form>
            <ul className={css.list}>
                {searchResults.map((movie) => (
                    <li className={css.item} key={movie.id}>
                        <Link className={css.link} to={`/movies/${movie.id}`} state={location}>
                            <img
                                src={movie.poster_path ? `${baseImageUrl}${movie.poster_path}` : noPoster}
                                alt={movie.title}
                                className={css.poster}
                            />
                            <span className={css.title}>{movie.title}</span>
                        </Link>
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    );
}