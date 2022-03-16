// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import profileImg from './profileImg.jpg';

class App extends Component {
  render(){
    const image = "profileImg.jpg";
    return (
     <React.Fragment>
        <div>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"  rel="stylesheet"/>
        </div>

          <div id="container">   
              <div class = "left">  
                  <div class="topL">  
                    <button onclick="document.getElementById('editP').style.display ='block'"
                            style={{width: 'auto', margin: 0}}>
                            <img src={profileImg} class="material-icons"/></button>
                    <span class="myNotes">My Notes</span>
                    <button class="addNote" onclick="addNote()"><span class="material-icons">note_add</span></button>
                  </div>
                  <div class="bottomL">
                        <div class= "search">
                            <span class="material-icons">search</span>
                            <input type="text" name="search" placeholder="Search all notes"
                            style={{border: 'none', marginTop: '10px', marginBottom: '10px'}} />
                        </div>

                        <div id="note_list" class="note_list2">     </div>

                  </div>
              </div>

              <div class="right">
                  <div class="topR">  
                      <button style={{display:'contents'}}><span class="material-icons" id="back" >arrow_back</span></button>
                      <button><span class="material-icons">notification_add</span></button>
                      <button><span class="material-icons">person_add_alt</span></button>
                      <button class="deleteNote"onclick="deleteNote()"><span class="material-icons">delete_outline</span></button>
                  </div>

                  <div class="bottomR">
                      <textarea id="textA" disabled="true" onkeyup="saveNote()" style={{font: 'Helvetica, Arial'}}></textarea>
                  </div>
              </div>
          </div>

    </React.Fragment>
      );
  }

}

export default App;
