// const express = require('express');
// const mongoose = require('mongoose'); //Connecting to MongoDB
// const Note = require('./models/note');
// const User = require('./models/user');
// const Tag = require('./models/tag');


// const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// //Set up mongoose connection BASIC SETUP CODE
// var mongoDB = 'mongodb://localhost:27017/Note-App'; //database URL here
// mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
// var db = mongoose.connection;//get default connection
// //Bind connection to error event
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));



// port = process.env.PORT || 3000;
// app.listen(port, () => { console.log('server started!')});

import './App.css';
import React, { useEffect, useState } from 'react';
import Left from './components/left'
import Right from './components/right'
import EditProfile from './components/editProfile'
import{ nanoid } from 'nanoid';

function App(){

  const initalNoteArray=[ 
  { id: nanoid(),
    text:"CSE316",
    date: Date.now(),
    tags:[]
  },

  { id: nanoid(),
    text:"This is a note with a long line of text. Notice that the text will automatically wrap to the next line once it reaches the right side of the screen.",
    date: Date.now(),
    tags:[{id: 'Hi', text:'Hi'}, {id: 'My', text:'My'}, {id: 'Name', text:'Name'}, {id: 'is', text:'is'}, {id:'Yunah', text:'Yunah'}]
  },
  
  { id: nanoid(),
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet felis condimentum, cursus urna ut, mollis urna. Integer convallis lorem lorem. Quisque eget libero sed nunc gravida tristique. Vivamus nec vestibulum nunc. Integer molestie purus ac dolor viverra, non venenatis sem tempus. Aliquam sit amet eleifend lorem. Maecenas id condimentum purus. Phasellus et mauris felis. Ut suscipit metus tempor tempor malesuada. Nunc laoreet justo auctor, elementum elit vel, vehicula massa. Praesent a neque eget est sollicitudin blandit non ac lacus. Morbi vitae dictum neque. Vivamus dolor est, imperdiet et leo in, iaculis consectetur massa.Nunc laoreet metus a augue dignissim, id fringilla turpis blandit. Cras luctus, quam et dignissim viverra, magna libero aliquam ipsum, at finibus libero leo et magna. Nullam volutpat, diam in consequat gravida, velit elit dapibus magna, ut tincidunt nunc tellus nec ante. Sed lorem ante, pharetra et faucibus sodales, tristique id mi. Nullam at massa egestas, iaculis magna molestie, dapibus lectus. Nullam eu turpis massa. Mauris tempor fringilla turpis semper consequat. Sed porta sem dolor, in venenatis leo consequat vel. Nullam et ullamcorper nisi.",
    date: Date.now(),
    tags: []
  }
 ]

  const [notes, setNotes] = useState(localStorage.myNotes? JSON.parse(localStorage.myNotes) : initalNoteArray) //use local Storage 
  const[selectedNoteId, setSelectedNoteId] = useState('');

  useEffect( ()=>{
    localStorage.setItem("myNotes", JSON.stringify(notes))}, [notes] );

  const addNote = () => {
    setSearchText('');
    document.getElementById('searchBar').value='';
    document.getElementById('clearSearchBtn').style.color='transparent';
    const newNote = {
      id: nanoid(),
      text:"New Note",
      date: Date.now(),
      tags:[]
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  }

  const handleSelectedNote=(id) =>{ //clicking on a note in the list
    setSelectedNoteId(id);
    setShowSideBar(false);
  }

  const deleteNote = (e) => {
    const index2Delete = notes.indexOf(notes.find((note) => note.id === selectedNoteId));
    if(index2Delete === 0){ 
      if(notes.length===1){
        console.log("CASE1");
        setNotes(notes.filter((note) => note.id !== e));
      }
      else{
        console.log("CASE1");
        setNotes(notes.filter((note) => note.id !== e));
        const newArray = notes.filter((note) => note.id !== e);
        setSelectedNoteId(newArray[0].id);
      }
    }
    else if(index2Delete === notes.length-1){
      console.log("CASE2");
      setNotes(notes.filter((note) => note.id !== e));
      const newArray = notes.filter((note) => note.id !== e);
      setSelectedNoteId(newArray[newArray.length-1].id);
    }
    else{
      console.log("CASE3");
      const newDisplayedNote = index2Delete;
      setNotes(notes.filter((note) => note.id !== e));
      const newArray = notes.filter((note) => note.id !== e);
      setSelectedNoteId(newArray[newDisplayedNote].id);
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
  setShowSideBar(true);
}
const screenDimension = useWindowDimensions();

/////////////////////SEARCH///////////////////////////////////////
const[searchText, setSearchText] = useState('');

  return (
    <React.Fragment>
      <div id="container">  
          <Left 
              notes={notes.filter((note)=>note.text.includes(searchText))} 
              addNote = { addNote } 
              profileClicked = { profileClicked }
              selectedNoteId ={ selectedNoteId }
              handleSelectedNote ={ handleSelectedNote }
              handleSearchText ={setSearchText}
              setSelectedNoteId={setSelectedNoteId}
              showSideBar = {showSideBar}
              ifSmallScreen = {screenDimension.width <= 500}
               />     

          <Right 
              notes={notes} 
              deleteNote ={ deleteNote } 
              selectedNote = { getSelectedNote() }
              note2Delete = { getSelectedNote() }
              onEditNote = {onEditNote}
              back2SideBar ={ back2SideBar }
              showSideBar = {showSideBar}
              ifSmallScreen = {screenDimension.width <= 500}
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
