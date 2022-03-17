// import logo from './logo.svg';
import './App.css';
import React, { Component, useState } from 'react';
import Left from './components/left'
import Right from './components/right'
import EditProfile from './components/editProfile'
import{ nanoid } from 'nanoid';
// import uuid from 'react-uuid';

function App(){

  const image = "profileImg.jpg";

  const [notes, setNotes] = useState([
    { id: nanoid(),
      text:"CSE316",
      date: Date.now()
    },

    { id: nanoid(),
      text:"This is a note with a long line of text. Notice that the text will automatically wrap to the next line once it reaches the right side of the screen.",
      date: Date.now()
    }
]) 
  const[selectedNote, setSelectedNote] = useState('');


  const addNote = () => {
    console.log("ADDED")
    const newNote = {
      id: nanoid(),
      text:"New Note",
      date: Date.now()
    };
    setNotes([newNote, ...notes]);
  }

  const deleteNote = (idToDelete) => {
    console.log("DELETED")
    setNotes(notes.filter((note) => note.id != idToDelete))
  }

  const profileClicked = () =>{
    console.log("PROFILE CLICKED")
  }

  const closeModal = () =>{
    console.log("MODAL CLOSED");
  }

  const back2SideBar = () =>{
    console.log("RETURNED TO SIDEBAR");
  }

  const getSelectedNote=()=>{
    // return (notes.find((note) => note.id === selectedNote)).text;
    return notes.find((note) => note.id === selectedNote);
  }

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) =>{
        if(note.id === selectedNote){
          return updatedNote;
        }
        return note;
    });
    setNotes(updatedNotesArray);
  }

  // notes[0].className ={"selected_note"};
  return (
    <React.Fragment>
      
      <div className="head">
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"  rel="stylesheet"/>
      </div>

      <div id="container">  
          <Left 
              notes={notes} 
              addNote = { addNote } 
              profileClicked = { profileClicked }
              selectedNote ={ selectedNote }
              setSelectedNote ={ setSelectedNote }
               />    
          <Right 
              notes={notes} 
              deleteNote ={ deleteNote } 
              back2SideBar ={ back2SideBar }
              selectedNote = { getSelectedNote() }
              onUpdateNote ={ onUpdateNote }/>
              
          <EditProfile closeModal = { closeModal }/>
          {/* Prop name ={ name of the state that is passed down} */}
      </div>

    </React.Fragment>
    );
  }
export default App;
