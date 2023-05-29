import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Post from './Post';
import PropTypes from 'prop-types';

export default function Blog() {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { id: blogId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        setPosts();
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${blogId}`, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(`Failed to load blog ${blogId} - ${e.message}`);
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      abortController.abort();
    }
  }, [blogId]);

  return (
    <>
      {loading && <div>loading...</div>}
      {error && <div className="error">{error}</div>}
      {posts?.map(post => <Post key={post.id} post={post} />)}
      <Link to="/blogs/blog/5">Check out this blog!</Link>
    </>
  )
}

Post.PropTypes = {post:PropTypes.shape({
  id:PropTypes.number.isRequired,
  title:PropTypes.string,
  body:PropTypes.string.isRequired
})}