// import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from 'react';
import Left from './components/left'
import Right from './components/right'
import EditProfile from './components/editProfile'
import{ nanoid } from 'nanoid';

function App(){

  const image = "profileImg.jpg";

  const [notes, setNotes] = useState([
    { id: nanoid(),
      text:"CSE316",
      date:"2022/3/16, 21:50:00"
    },

    { id: nanoid(),
      text:"This is a note with a long line of text. Notice that the text will automatically wrap to the next line once it reaches the right side of the screen.",
      date:"2022/3/16, 21:50:00"
    }
]);

  const addNote = () => {
    console.log("ADDED");
  }
  const deleteNote = () => {
    console.log("DELETED")
  }


  return (
    <React.Fragment>
      <div className="head">
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"  rel="stylesheet"/>
      </div>

      <div id="container">  
          <Left notes={notes} addNote = { addNote }/>    
          {/* Prop name ={ name of the state that is passed down} */}
          <Right notes={notes} deleteNote ={ deleteNote } />
          <EditProfile/>
      </div>

    </React.Fragment>
    );
  }
export default App;
