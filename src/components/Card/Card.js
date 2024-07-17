import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from 'moment';
import {
    TiArrowDownOutline,
    TiArrowDownThick,
    TiArrowUpOutline,
    TiArrowUpThick,
    TiMessages
} from "react-icons/ti";
import { startGetPostComments, toggleShowingComments } from "../../store/redditSlice";
import { Comment} from "../Comment/Comment";
import { numberFormat } from "../../utils/NumberFormat";
import "./Card.css";

export const Card = ({ card, index }) => {
    const [error, setError] = useState(false);
    const [arrowDirection, setArrowDirection] = useState(0);
    const dispatch = useDispatch();

    const handleError = () => {
        setError(true);
    }

    const onClickarrow = (direction) => {
        setArrowDirection(direction);
    }

    const arrowUp = () => {
        return (
            <div>
                {arrowDirection === 1 ? (<TiArrowUpThick style={{ color: 'green' }} />) : 
                (<TiArrowUpOutline style={{ color: 'green' }} />)}
            </div>
        )
    }

    const arrowDown = () => {
        return (
            <div>
                {arrowDirection === -1 ? (<TiArrowDownThick style={{ color: 'red' }} />) :
                (<TiArrowDownOutline style={{ color: 'red'}} />)}
            </div>
        )
    }

    const onClickComments = () => {
        if(!card.showingComments) {
            dispatch(startGetPostComments({ index: index, permalink: card.permalink }));
        } else {
            dispatch(toggleShowingComments(index));
        }
    };

    const showComments = () => {
        if(card.isLoadingComment) {
            return (
                <p>Loading comments...</p>
            )
        } else if (card.hasErrorComment) {
            return (
                <p>Error occurred while loading the comments...</p>
            )
        } else if (card.showingComments) {
            return (
                <div>
                    {card.comments.map(comment => (<Comment comment={comment} key={comment.id} />))}
                </div>
            )
        } else {
            return null;
        }
    };

    return (
        <div className="card">
            <h2>{card.title}</h2>
            <div className="card-top">
                <div className="card-like">
                    <button
                        className="icon-action"
                        onClick={() => onClickarrow(1)}
                    >
                        {arrowUp()}
                    </button>
                    <p>{numberFormat(card.ups)}</p>
                    <button
                        className="icon-action"
                        onClick={() => onClickarrow(-1)}
                    >
                        {arrowDown()}
                    </button>
                </div>
                <div className="img-post">
                    {error ? null : <img src={card.url} loading="lazy" alt="" onError={handleError} />}
                </div>
            </div>
            <hr />
            <div className="card-sub">
                <p>{`Posted by: ${card.author}`}</p>
                <p>{moment.unix(card.created_utc).fromNow()}</p>
                <div className="comment-icon-num">
                    <button
                        className="icon-action"
                        onClick={onClickComments}
                    >
                        <TiMessages />
                    </button>
                    <p>{numberFormat(card.num_comments)}</p>
                </div>
                <div className="comments">{showComments()}</div>
            </div>
        </div>
    )
}