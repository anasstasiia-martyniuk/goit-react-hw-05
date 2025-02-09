import { Link } from "react-router-dom";

export default function NotFoundPage () {
    return (
        <>
            <h1>NOT FOUND</h1>
            <Link to={'/'}>Go to Home page</Link>
        </>
    );
}   