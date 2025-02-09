import { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const makeLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <div className={css.allc}>
                <h1 className={css.h1}><span className={css.h2}>Well</span>Movie</h1>
                <div className={css.menuWrapper}>
                    <button className={css.burger} onClick={toggleMenu}>
                        &#9776;
                    </button>
                    <nav className={clsx(css.nav, isMenuOpen && css.open)}>
                        <NavLink to="/" className={makeLinkClass} onClick={closeMenu}>Trending</NavLink>
                        <NavLink to="/movies" className={makeLinkClass} onClick={closeMenu}>Search</NavLink>
                        <NavLink to="/random" className={makeLinkClass} onClick={closeMenu}>Random</NavLink>
                    </nav>
                </div>
            </div>
            <hr />
        </>
    );
}