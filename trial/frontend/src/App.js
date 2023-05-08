import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import Grid from './Grid';

export default function App() {
  const [data, setDate] = useState();
  const [dropdownData, setDropdown] = useState();
  const [id, setId]= useState();
 

  useEffect(()=>{(async function loaddata(){
    try {
      const response = await fetch('http://localhost:5000/all', {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'
        }}
      );
      if (! response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
    setDate(data);
    setId(data.id);
      } 
    catch(e){
      console.error(e);
    }})()
  }, [])

  useEffect(()=>{(async function loadCategory(){
    try {
      const response = await fetch('http://localhost:5000/category', {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'
        }}
      );
      if (! response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const dropdownData = await response.json();
    setDropdown(dropdownData);
    console.log(dropdownData);
    } 
    catch(e){
      console.error(e);
    }})()
  }, [])



  return (
   data ? data.map(i=>{ return <Grid key= {i.id} data={i} ></Grid>}) : <div>loading</div>
   
  );
}


