import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import Left from './components/left'
import Right from './components/right'
import EditProfile from './components/editProfile'
import {createNoteAPIMethod, getNotesAPIMethod, deleteNoteByIdAPIMethod, updateNoteAPIMethod} from "./api/client";

function App(){
  const [notes, setNotes] = useState([]);
  const[selectedNoteId, setSelectedNoteId] = useState('');

  const getSelectedNote=()=>{
    return notes.find((note) => note._id === selectedNoteId);
  }
  const selectedNote = getSelectedNote();

  useEffect(() => {
    function fetchData() {
        getNotesAPIMethod().then((notes) => { //retreiving all notes
            setNotes(notes);
            // console.dir(notes);
        }).catch((err) => {
            console.error('Error retrieving note data: ' + err);
        });
    };
    fetchData();
}, [setNotes]);

  const addNote = () => {
    setSearchText('');
    document.getElementById('searchBar').value='';
    document.getElementById('clearSearchBtn').style.color='transparent';
    const newNote = {
      text:"New Note",
      lastUpdatedDate: Date.now(),
      tags:[]
    };
    createNoteAPIMethod(newNote).then((response) => {
      console.log("Created the note on the server");
      console.dir(response);
      setNotes([response, ...notes]);
     setSelectedNoteId(response._id);
  });
}

  const handleSelectedNote=(id) =>{ //clicking on a note in the list
    setSelectedNoteId(id);
    setShowSideBar(false);
  }

  const deleteNote = (e) => {
    deleteNoteByIdAPIMethod(selectedNoteId).then((response) => {
      console.log("Deleted the note on the server");
  });
    const index2Delete = notes.indexOf(notes.find((note) => note._id === selectedNoteId));
    if(index2Delete === 0){ 
      if(notes.length===1){
        setNotes(notes.filter((note) => note._id !== e));
      }
      else{
        setNotes(notes.filter((note) => note._id !== e));
        const newArray = notes.filter((note) => note._id !== e);
        setSelectedNoteId(newArray[0]._id);
      }
    }
    else if(index2Delete === notes.length-1){
      setNotes(notes.filter((note) => note._id !== e));
      const newArray = notes.filter((note) => note._id !== e);
      setSelectedNoteId(newArray[newArray.length-1]._id);
    }
    else{
      const newDisplayedNote = index2Delete;
      setNotes(notes.filter((note) => note._id !== e));
      const newArray = notes.filter((note) => note._id !== e);
      setSelectedNoteId(newArray[newDisplayedNote]._id);
    }
  }


  const onEditNote = (updatedNote) => {
    if(notes.indexOf(selectedNote)!=0){
      notes.splice(notes.indexOf(selectedNote), 1);
      notes.splice(0, 0, selectedNote);
    }

    const updatedNotesArray = notes.map((note)=>{
      if(note._id === selectedNoteId){
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);

    updateNoteAPIMethod(updatedNote).then((response) => {
      console.log("Updated note on the server");
    }).catch(err => {
    console.error('Error updating note data: ' + err);
    })
    saveNotesOnServer(updatedNote)
}
  
  function debounce(func, timeout=1000){
    let timer;
    return(...args) => {
      clearTimeout(timer);
      timer = setTimeout(()=>{func.apply (this, args);} , timeout);
    }
  }

  const saveNotesOnServer = useCallback(debounce(( theNote ) => {
    /* your debounced code to save to the server here */  
    updateNoteAPIMethod(theNote).then((res)=>{
      console.dir(res);
    }).catch((err)=>{
      console.error('Error retrieving note data: ', err);
    })
}), []);
////////////////////////profile/////////////////////////////////////////
window.onclick = function(event) {
  if (event.target === document.getElementById('editP')) {
    document.getElementById('editP').style.display = "none";
  }
}
  const profileClicked = () =>{
    document.getElementById('editP').style.display= "block"
  }
/////////////////////////SEARCH///////////////////////////////////////
const[searchText, setSearchText] = useState('');

const clearSearchBar =() =>{
  console.log("notes after", notes);
  setSelectedNoteId(notes[0]._id);
  document.getElementById('clearSearchBtn').style.color='transparent'
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
const screenDimension = useWindowDimensions();

const [showSideBar, setShowSideBar] = useState(false);
const back2SideBar = () =>{
  setShowSideBar(true);
}

  return (
    <React.Fragment>
      <div id="container">  
          <Left 
              notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText))} 
              addNote = { addNote } 
              profileClicked = { profileClicked }
              selectedNoteId ={ selectedNoteId }
              selectedNote = { getSelectedNote() }
              handleSelectedNote ={ handleSelectedNote }
              handleSearchText ={setSearchText}
              setSelectedNoteId={setSelectedNoteId}
              showSideBar = {showSideBar}
              ifSmallScreen = {screenDimension.width <= 500}
              clearSearchBar={clearSearchBar}
               />     

          <Right 
              notes={notes} 
              deleteNote ={ deleteNote } 
              selectedNote = { getSelectedNote() }
              onEditNote = {onEditNote}
              back2SideBar ={ back2SideBar }
              showSideBar = {showSideBar}
              ifSmallScreen = {screenDimension.width <= 500}
              />
   
          <EditProfile/>
      </div>

    </React.Fragment>
    );
  }
export default App;
