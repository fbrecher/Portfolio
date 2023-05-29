import './Post.css';
import React, { useState } from 'react'
import Comments from './Comments';
import PropTypes from 'prop-types';

export default function Post({ post: { id, title, body } }) {
  const [commentsShowing, setCommentsShowing] = useState(false);

  return (
    <div className="post">
      <h2 className="title">{title}</h2>
      <p className="body">{body}</p>
      <div className="comments-area">
        <div className={commentsShowing ? 'comments' : 'comments closed'}>
          {<Comments postId={id} />}
        </div>
        <button onClick={() => setCommentsShowing(!commentsShowing)}>{commentsShowing ? 'hide' : 'show'} comments</button>
      </div>
    </div>
  )
}

Comments.PropTypes = {postId:PropTypes.exact(PropTypes.number.isRequired)}
