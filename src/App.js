// import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from 'react';
import Left from './components/left'
import Right from './components/right'
import EditProfile from './components/editProfile'
import{ nanoid } from 'nanoid';

function App(){

  const initalNoteArray=[ { 
    id: nanoid(),
    text:"CSE316",
    date: Date.now(),
    tags:['Hello']
  },

  { id: nanoid(),
    text:"This is a note with a long line of text. Notice that the text will automatically wrap to the next line once it reaches the right side of the screen.",
    date: Date.now(),
    tags:['HI','My','Name','is','Yunah']
  } ]

  const [notes, setNotes] = useState(localStorage.myNotes? JSON.parse(localStorage.myNotes) : initalNoteArray) //use local Storage 
  const[selectedNoteId, setSelectedNoteId] = useState('');


  useEffect( ()=>{
    localStorage.setItem("myNotes", JSON.stringify(notes))}, [notes] );

  const addNote = () => {
    console.log("ADDED")
    const newNote = {
      id: nanoid(),
      text:"New Note",
      date: Date.now(),
      tags:[]
    };
    setNotes([newNote, ...notes]);
  }

  const handleSelectedNote=(id) =>{ //clicking on a note in the list
    setSelectedNoteId(id);
    setShowSideBar(false);
  }

  const deleteNote = (e) => {
    const index2Delete = notes.indexOf(notes.find((note) => note.id === selectedNoteId));
    // setNotes(notes.filter((note) => note.id !== e))
    if(index2Delete === 0){
      setNotes(notes.filter((note) => note.id !== e))
      console.log(notes)
      setSelectedNoteId(notes[0].id)
    }
    else if(index2Delete === notes.length-1){
      setNotes(notes.filter((note) => note.id !== e))
      setSelectedNoteId(notes[notes.length-1].id)
    }
    else{
      const newDisplayedNote = index2Delete;
      setNotes(notes.filter((note) => note.id !== e))
      setSelectedNoteId(notes[newDisplayedNote ].id)
    }
  }


  const getSelectedNote=()=>{
    return notes.find((note) => note.id === selectedNoteId);

  }
  const onEditNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note)=>{
      if(note.id === selectedNoteId){
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  }
////////////////////////profile/////////////////////////////////////////
window.onclick = function(event) {
  if (event.target === document.getElementById('editP')) {
    console.log("CLICKED")
    document.getElementById('editP').style.display = "none";
  }
}
  const profileClicked = () =>{
    console.log("PROFILE CLICKED", document.getElementById('editP'))
    document.getElementById('editP').style.display= "block"
  }
  const closeModal = () =>{
    console.log("MODAL CLOSED", document.getElementById('editP'));
    document.getElementById('editP').style.display= "none";
  }
////////////////////////profile to LS/////////////////////////////////////////
  const[formValues, updateFormValues] = useState(localStorage.profileInfo? JSON.parse(localStorage.profileInfo) : [])

  useEffect( ()=>{
    localStorage.setItem("profileInfo", JSON.stringify(formValues), [formValues])
  
    });

  const handleChangeProfile = (e)=>{
    updateFormValues((prevValues)=>({
      ...prevValues,
      [e.target.name] : e.target.value
    }))

  }
  const[theme, updateTheme]=useState(localStorage.themes? JSON.parse(localStorage.themes): '' )

  useEffect(()=>{
    localStorage.setItem("themes", JSON.stringify(theme), theme)
  })

const handleThemeChange = ()=>{
    console.log("Changing theme");
    const select = document.querySelector(".select");
    const currentValue = select.options[select.selectedIndex].value;
    console.log(currentValue)
    updateTheme(currentValue);

}

  const onSave = (e) =>{
    alert("Saved");
    closeModal();
  }
////////////////////window size getter/////////////////////////////////
function getWindowDimensions() {
  const { innerWidth: width} = window;
  return {
    width
  };
}
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);}, []);

  return windowDimensions;
}
/////////////////sideBar when smaller window size/////////////////////////////////////////
const [showSideBar, setShowSideBar] = useState(false);
const back2SideBar = () =>{
  console.log("RETURNED TO SIDEBAR");
  setShowSideBar(true);
}
const screenWidth = useWindowDimensions().width;
const ifSmallScreen = () =>{
  return (screenWidth <= 500);
}


  return (
    <React.Fragment>
      <div id="container">  
          <Left 
              notes={notes} 
              addNote = { addNote } 
              profileClicked = { profileClicked }
              selectedNoteId ={ selectedNoteId }
              handleSelectedNote ={ handleSelectedNote }
              ifSmallScreen = {ifSmallScreen()}
               />    
          <Right 
              notes={notes} 
              deleteNote ={ deleteNote } 
              selectedNote = { getSelectedNote() }
              note2Delete = { getSelectedNote() }
              onEditNote = {onEditNote}
              back2SideBar ={ back2SideBar }
              showSideBar = {showSideBar}
              ifSmallScreen = {ifSmallScreen()}
              />
              
          <EditProfile 
              closeModal = { closeModal }
              onSave = {onSave}
              handleChangeProfile = { handleChangeProfile }
              formValues = { formValues }
              handleThemeChange = {handleThemeChange}
              theme ={theme}
              />
      </div>

    </React.Fragment>
    );
  }
export default App;
