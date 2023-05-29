import './BlogInfo.css';
import React from 'react'
import { Link } from 'react-router-dom';

export default function BlogInfo({ blog: { id, name, website, company: { name: companyName, catchPhrase, bs } } }) {
  return (
    <Link to={`/blogs/blog/${id}`} className="blog">
      <h1 className="title">{name}</h1>
      <h2 className="website">{website}</h2>
      <div className="company">
        <h3>{companyName}</h3>
        <p>{catchPhrase}</p>
        <p>{bs}</p>
      </div>
    </Link>
  )
}
