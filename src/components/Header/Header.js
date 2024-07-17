import React from "react";
import { FaReddit } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar"; // Adjust the path as needed
import "./Header.css";

export const Header = () => {
    return (
        <header>
            <FaReddit className="logo" />
            <h1><span>Mini</span>Reddit</h1>
            <SearchBar />
        </header>
    );
};
