
import { useEffect, useState } from 'react';
import Post from './Post';

export default function LoadPosts({post}) {
  const [selelcted, setSelected]= useState();
  const [blogs, setBlogs] = useState();
  let blogsReturn;
  useEffect(()=>{
    (async function Load(){
      try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${post}`);
        if (! response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const blog = await response.json();
        setBlogs(blog);
      } 
      catch(error){
        console.error(error.message)
      }
  })()}, [post])
    
  blogsReturn= blogs?.map(
    (blog) =>
      <div key={blog.id} className= "display" >
        <h1 >{blog.name} </h1>
        <h1>{blog.id}</h1>
        <h2>{blog.title}</h2>
        <p>{blog.body}</p>
        <p id={blog.id}></p>
        <div onClick={()=>setSelected(blog)}><Post key={blog.id} selelctedBlog={selelcted}/></div>
      </div>
  )
  
  return (  
  <> 
    {blogsReturn} 
  </>
  );
}