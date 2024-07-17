import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetAllPosts, selectAllPostFilter } from "../../store/redditSlice";
import { Card } from "../Card/Card";
import "./Posts.css";

export const Posts = () => {
    const dispatch = useDispatch();

    const reddit = useSelector((state) => state.reddit);
    const { selectedSubreddit, isLoading } = reddit;
    const allPostFilter = useSelector(selectAllPostFilter);

    useEffect(() => {
        dispatch(startGetAllPosts(selectedSubreddit));
    }, [selectedSubreddit, dispatch]);

    return (
        <div className="posts-container">
            {
                isLoading ? <p>Loading</p> : allPostFilter.map((card, index) => (
                    <Card key={card.id} card={card} index={index} />
                ))
            }
        </div>
    );
};