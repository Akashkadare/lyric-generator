import './App.css';
import Axios from 'axios';
import { useState } from 'react';
import styled from "styled-components"
const Input=styled.input`
 color: #fff;
    font-size: 1.50rem;
    line-height: 1;
    border-style: none;
    outline: none;
    // height calc line-height + (vertical-padding * 2) + (vertical-border * 2)
    height: calc(1em + 1.6em + 0.5em);
    width: 50%;
    padding: 0.3em 1em;
    border: 0.25em solid transparent;
    background-image: linear-gradient(#000, #000),
      linear-gradient(120deg, #f09 0%, #0ff 50%, #9f0 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    border-radius: 1.8em;
    background-size: 200% 100%;
    transition: background-position 0.8s ease-out;;

`
const Button=styled.button`
height:4em;
width:8em;
font-size: 1em;
 background-image:linear-gradient(120deg, #f09 0%, #0ff 50%, #9f0 100%);

`
function App() {
    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");
    const [lyrics, setLyrics] = useState("");
  const[errors,setErrors]=useState(true)
    function searchLyrics() {
        if (artist === "" || song === "") {
            return;
        }
        Axios.get(
`https://api.lyrics.ovh/v1/${artist}/${song}`).then(res => {
            console.log(res.data.lyrics);
            setLyrics(res.data.lyrics);
           setErrors(false)
        })
        .catch(error => {
          // setErrors(true);
          console.log(error)
        });
    }
    searchLyrics()
    return (
        <div className="App">
            <h1>Lyric Generator By Akash</h1>

            <Input className="inp" type="text" 
                placeholder='Artist name'
                onChange={(e) => { setArtist(e.target.value) }} /><br></br> <br></br>
            <Input className="inp" type="text" 
                placeholder='Song name'
                onChange={(e) => { setSong(e.target.value) }} /><br></br> <br></br>
          <Button>Search</Button>
        
            <hr />
            <pre>{lyrics}</pre>
          {
            errors ? <h1>No Lyric Found</h1>:""
          }
        </div>
    );
}

export default App;
