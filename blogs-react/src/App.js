import './App.css';
import LoadPosts from './Posts';
import { useEffect, useState } from 'react';

export default function App() {
  const [selelctedBlog, setSelectedBlog]= useState();
  const [blogs, setBlogs] = useState();
  let blogsReturn;
  useEffect(()=>{
    (async function LoadBlogs(){
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (! response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const blog = await response.json();
      setBlogs(blog);
      } 
      catch(e){
        console.error(e);
      }
    })()
  }, [])
  blogsReturn= blogs?.map((blog)=> 
    <div key={blog.id} className= "display" onClick={()=>{setSelectedBlog(blog.id)}}>
      <h1 > {blog.name} </h1>
      <h2> {blog.website} </h2>
      <h3> {blog.company.name} </h3>
      <p> {blog.company.catchPhrase} </p>
      <p> {blog.company.bs} </p>
    </div>
  )
  return (
  <> 
    <div> {selelctedBlog? <LoadPosts key={selelctedBlog} post = {selelctedBlog}/> : blogsReturn}</div>
  </>
  );
}