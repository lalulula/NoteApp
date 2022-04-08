import './App.css';
import React, { useEffect, useState } from 'react';
import Left from './components/left'
import Right from './components/right'
import EditProfile from './components/editProfile'
import {createNoteAPIMethod, getNoteAPIMethod, deleteNoteByIdAPIMethod, updateNoteAPIMethod} from "./api/client";

function App(){
  const [notes, setNotes] = useState([]);
  const[selectedNoteId, setSelectedNoteId] = useState('');

  useEffect(() => {
    function fetchData() {
        getNoteAPIMethod().then((notes) => {
            setNotes(notes);
            console.dir(notes);
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
      // history.push(`/notes/${response._id}`);
      setNotes([response, ...notes]);
      selectedNoteId(response._id);
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

    // updateNoteAPIMethod(updatedNote).then((response) => {
    //     console.log("Updated the note on the server");
    // }).catch(err => {
    //     console.error('Error updating note data: ' + err);
    // })

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
const[formValues, updateFormValues] = useState([])
const handleChangeProfile = (e)=>{
    updateFormValues((prevValues)=>({
      ...prevValues,
      [e.target.name] : e.target.value
    }))

  }

const[theme, updateTheme]=useState( '' )
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
/////////////////////////SEARCH///////////////////////////////////////
const[searchText, setSearchText] = useState('');
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
