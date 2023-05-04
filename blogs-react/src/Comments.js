import {useState, useEffect} from 'react';

export default function LoadComments({blog}){
  const [comments, setCommets] = useState();
  useEffect(()=>{
    (async function load() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${blog.id}`);
        if (! response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const comment = await response.json(); 
        setCommets(comment);
      }
      catch(e){
        console.error(e.message);
      }
    })()
  }, [blog])

  return(
    <>
      {comments?.map(comment=> 
        <div key={comment.id}>
          <h3>{comment.id}</h3>
          <h4>{comment.name}</h4>
          <h5>{comment.email}</h5>
          <p>{comment.body}</p>
        </div>
      )}
    </>
  )
}
