import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubtopics } from "../../store/subredditSlice";
import { changeSubreddit } from "../../store/redditSlice";
import { FaReddit } from "react-icons/fa";
import "./Subreddits.css";

export const Subreddits = () => {
    const dispatch = useDispatch();

    const subreddit = useSelector((state) => state.subreddit);
    const { subtopics, isLoading, hasError } = subreddit;

    useEffect(() => {
        dispatch(getSubtopics());
    }, [dispatch]);

    const onClickTopic = (url) => {
        dispatch(changeSubreddit(url));
    }

    const displaySubreddit = () => {
        if (isLoading) {
            return <p>Loading...</p>
        } else if (hasError) {
            return <p>Error</p>
        } else if (subtopics.length > 0) {
            return (
                <div className="subtopics">
                    <h2>Subreddits</h2>
                    <ul className="subreddit-list">
                        {subtopics.map((sub) => (
                            <li
                                onClick={() => onClickTopic(sub.url)}
                                className="topic"
                                key={sub.id}
                            >
                                <div className="img-title">
                                    {sub.header_img != null ? <img src={sub.header_img} alt="" /> : <FaReddit className="icon" />}
                                    <span>{sub.display_name}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }

    return (
        <div className="subreddits">
            {displaySubreddit()}
        </div>
    )
};
