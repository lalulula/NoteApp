// import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from 'react';
import Left from './components/left'
import Right from './components/right'
import EditProfile from './components/editProfile'
import{ nanoid } from 'nanoid';

function App(){
  const initalNoteArray=[ { id: nanoid(),
    text:"CSE316",
    date: Date.now()
  },

  { id: nanoid(),
    text:"This is a note with a long line of text. Notice that the text will automatically wrap to the next line once it reaches the right side of the screen.",
    date: Date.now()
  } ]

  const [notes, setNotes] = useState(JSON.parse(localStorage.myNotes) || initalNoteArray) //use local Storage 
  const[selectedNote, setSelectedNote] = useState('');

  useEffect( ()=>{
    localStorage.setItem("myNotes", JSON.stringify(notes))}, [notes] );

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
    setNotes(notes.filter((note) => note.id !== idToDelete))
    // if(idToDelete)
  }

  const back2SideBar = () =>{
    console.log("RETURNED TO SIDEBAR");
  }

  const getSelectedNote=()=>{
    // console.log(notes.indexOf(notes.find((note) => note.id === selectedNote)));
    return notes.find((note) => note.id === selectedNote);

  }
  const onEditNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note)=>{
      if(note.id === selectedNote){
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  }
///////////////profile/////////////////////////////////////////

  const profileClicked = () =>{
    console.log("PROFILE CLICKED", document.getElementById('editP'))
    document.getElementById('editP').style.display= "block"
  }

  window.onclick = function(event) {
    if (event.target === document.getElementById('editP')) {
      console.log("CLICKED")
      document.getElementById('editP').style.display = "none";
    }
  }
  const closeModal = () =>{
    console.log("MODAL CLOSED", document.getElementById('editP'));
    document.getElementById('editP').style.display= "none";
  }

  const[formValues, updateFormValues] = useState(JSON.parse(localStorage.profileInfo) || [])

  useEffect( ()=>{
    localStorage.setItem("profileInfo", JSON.stringify(formValues), [formValues])
  });

  const onSave = (e) =>{
    // e.preventDefault();
    alert("Saved");
  }
  const handleChangeProfile = (e)=>{
    updateFormValues((prevValues)=>({
      ...prevValues,
      [e.target.name] : e.target.value
    }))
  }




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
              note2Delete = { getSelectedNote() }
              onEditNote = {onEditNote}/>
              
          <EditProfile 
              closeModal = { closeModal }
              onSave = {onSave}
              handleChangeProfile = { handleChangeProfile }
              formValues = { formValues }
              />
          {/* Prop name(내가설정) ={ name of the state that is passed down} */}
      </div>

    </React.Fragment>
    );
  }
export default App;
