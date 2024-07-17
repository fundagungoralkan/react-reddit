import moment from "moment";
import ReactMarkdown from "react-markdown";
import './Comment.css';

export const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <div className="info">
                <p>{`Posted by: ${comment.author}`}</p>
                <p>{moment.unix(comment.created_utc).fromNow()}</p>
            </div>
            <ReactMarkdown>{String(comment.body)}</ReactMarkdown>
        </div>
    )
};