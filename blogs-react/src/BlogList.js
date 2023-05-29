import React, { useEffect, useState } from 'react'
import BlogInfo from './BlogInfo';
import PropTypes from 'prop-types';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/');
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setBlogs(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
      {blogs.map(blog => <BlogInfo key={blog.id} blog={blog} />)}
    </>
  )
}

BlogInfo.PropTypes = {blog:PropTypes.shape({ id:PropTypes.number.isRequired,
  name:PropTypes.string.isRequired,
  website:PropTypes.string,
  company:PropTypes.shape({
    name:PropTypes.string.isRequired,
    catchPhrase:PropTypes.string,
    bs:PropTypes.string
  })
})}
