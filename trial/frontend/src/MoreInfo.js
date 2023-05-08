import { useState } from "react";
import Details from "./Details";

export default function MoreInfo({id, setDetails, details}){
      async function loadDetails(id){
        try {
          const response = await fetch(`http://localhost:5000/id/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'
            }}
          );
          if (! response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
           details = await response.json();
           setDetails(details);
        } 
        catch(e){
          console.error(e);
        }}
    
    return (
        <>
        <button onClick={()=>loadDetails(id)}>more info</button>
        <Details key={id} details= {details}></Details>
        </>
    )
}