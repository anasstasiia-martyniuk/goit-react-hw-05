import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import css from "./MovieReviews.module.css"; 

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchMovieReviews = async () => {
            const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
            const options = {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTYwNDIwNTRjYjFhZWVlOTI5NTQ2ZmI1ZDQxYmIxNSIsIm5iZiI6MTczOTA5NjE2Ni45MDEsInN1YiI6IjY3YTg4MDY2MzEwMDFiZWMxM2M4ZDc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DKKmmgJ9cVM7ZTCJJCUpdgXUHJGmAiJTIw0Xy6035r8'
                }
            };

            try {
                const response = await axios.get(url, options);
                setReviews(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovieReviews();
    }, [movieId]);

    return (
        <div className={css.container}>
            {reviews.length > 0 ? (
                <ul className={css.reviewList}>
                    {reviews.map(review => (
                        <li className={css.reviewItem} key={review.id}>
                            <p className={css.reviewAuthor}>Author: {review.author}</p>
                            <p className={css.reviewContent}>{review.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <h2 className={css.noReviews}>NO REVIEWS YET</h2>
            )}
        </div>
    );
}