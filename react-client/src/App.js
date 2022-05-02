import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import LoginPage from './components/loginPage';
import Left from './components/left'
import Right from './components/right'
import EditProfile from './components/editProfile'
import {createNoteAPIMethod, getCurrentUserAPIMethod, getNotesAPIMethod, deleteNoteByIdAPIMethod, updateNoteAPIMethod} from "./api/client";
import {loadModel,determineRelatednessOfSentences} from "./universalSentenceEncoder"
loadModel();

function App(){
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [showSideBar, setShowSideBar] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);
  const [userProfile, updateUserProfile] = useState([]);


  const getSelectedNote=()=>{
    return notes.find((note) => note._id === selectedNoteId);
  }
  const selectedNote = getSelectedNote();

  useEffect(() => { 
    getCurrentUserAPIMethod().then((response) => { 
      console.log("hi");
      setUser(response)
    });
  }, []);

  useEffect(() => {
    function fetchData() {
      getNotesAPIMethod().then((notes) => { //retreiving all notes
        setSelectedNoteId(notes.length > 0 ? notes[0]._id:'');
          setNotes(notes);
          if(notes.length>0){
            const sortedNotes = notes.sort((a , b)=> Date.parse(b.lastUpdatedDate) - Date.parse(a.lastUpdatedDate));
            setSelectedNoteId(sortedNotes[0]._id)
          }
      }  ).catch((err) => {
          console.error('Error retrieving note data: ' + err);
      });
    };

  fetchData();
}, [user]);


useEffect(()=>{
  const compareNote = [];
  for(let i = 0 ; i<notes.length; i++){
    compareNote[i] = notes[i].text;
  }
  let index = notes.indexOf(selectedNote);
  let res = determineRelatednessOfSentences(compareNote,index);
  res.then(result => {
    // console.log("result scores",result);
    for(let i = 0; i<notes.length; i++){
      if(result &&(result[i].score>0.5) && (i!==index) ){
        document.getElementsByClassName('note_container')[i].style.backgroundColor ='#E6FFFA';
        document.getElementsByClassName('similar')[i].innerHTML = "similar";
      }
      else{
        document.getElementsByClassName('selected_note')[0].style.backgroundColor ='#E5F1FD';
        document.getElementsByClassName('note_container')[i].style.backgroundColor ='white';
        document.getElementsByClassName('similar')[i].innerHTML = "";
      }
    }
  })
  }, 

  [selectedNoteId]);


  const addNote = () => {
    setSearchText('');
    document.getElementById('searchBar').value='';
    document.getElementById('clearSearchBtn').style.color='transparent';
    const newNote = {
      text:"New Note",
      lastUpdatedDate: Date.now(),
      tags:[],
      agent: user
    };
    createNoteAPIMethod(newNote).then((response) => {
      console.log("Created the note on the server");
      console.dir(response);
      setNotes([response, ...notes]);
     setSelectedNoteId(response._id);
  });
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
    if(notes.indexOf(selectedNote)!==0){
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
    saveNotesOnServer(updatedNote);
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
const clearSearchBar =() =>{
  console.log("notes after", notes);
  setSelectedNoteId(notes[0]._id);
  document.getElementById('clearSearchBtn').style.color='transparent'
}
////////////////////window size getter/////////////////////////////////
function getWindowDimensions() {
  const {innerWidth: width} = window;
  return {width};
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

const back2SideBar = () =>{
  setShowSideBar(true);
}


  if(!user){
    return(<LoginPage setUser={setUser}
                      /> );
    }

  return (
    <React.Fragment>
      <div id="container">
          <Left
              notes={notes.filter((note)=>note.text.includes(searchText))}
              addNote = { addNote }
              profileClicked = { profileClicked }
              selectedNoteId ={ selectedNoteId }
              setSelectedNoteId={setSelectedNoteId}
              selectedNote = { getSelectedNote() }
              // handleSelectedNote ={ handleSelectedNote }
              showSideBar = {showSideBar}
              setShowSideBar={setShowSideBar}
              ifSmallScreen = {screenDimension.width <= 500}
              handleSearchText ={setSearchText}
              clearSearchBar={clearSearchBar}
              userProfile={userProfile}
               />

          <Right
              notes={notes}
              deleteNote ={ deleteNote }
              selectedNote = { getSelectedNote() }
              setSelectedNoteId={setSelectedNoteId}
              onEditNote = {onEditNote}
              back2SideBar ={ back2SideBar }
              showSideBar = {showSideBar}
              ifSmallScreen = {screenDimension.width <= 500}
              />

          <EditProfile
                user={user}
                setUser={setUser}
                userProfile={userProfile}
                updateUserProfile={updateUserProfile}/>
      </div>

    </React.Fragment>
    );
  }
export default App;
