import './Comment.css';
import React from 'react'

export default function Comment({ comment: { id, name, body, email } }) {
  return (
    <div className="comment">
      <h3 className="id">{id}</h3>
      <h4 className="name">{name}</h4>
      <h5 className="body">{body}</h5>
      <p className="email">{email}</p>
    </div>
  )
}
