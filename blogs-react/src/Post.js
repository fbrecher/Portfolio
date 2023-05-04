import {useState} from 'react';
import LoadComments from './Comments';

export default function Post({selelctedBlog}){
  const [commentsState, setCommentsState]= useState(false);
  return(
          <div className= "display" >
            <button className="comment" onClick={()=>{
            setCommentsState(!commentsState)}}>{commentsState ?  'Hide ' : 'Show '}Comments</button>
            <div>{commentsState && <LoadComments blog = {selelctedBlog}/>}</div>
          </div>
        )
}
