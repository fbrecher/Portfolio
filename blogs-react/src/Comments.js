import React, { useEffect, useState } from 'react'
import Comment from './Comment';
import PropTypes from 'prop-types';

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (e) {
        setError(`Failed to load comments for ${postId} - ${e.message}`);
      }
    })();
  }, [postId]);

  return (
    <>
      {error && <div className="error">{error}</div>}
      {comments?.map(comment => <Comment comment={comment} />)}
    </>
  );
}

Comment.PropTypes = {comment:PropTypes.shape({
  id:PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  body:PropTypes.string.isRequired,
  email:PropTypes.string
})}