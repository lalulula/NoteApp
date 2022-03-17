import React, { Component } from 'react';
import profileImg from './profileImg.jpg'

function TopLeft({addNote ,  profileClicked }){

    return(
            <div className="topL"> 
                    <button onClick= { profileClicked }
                            style={{width: 'auto', margin: 0, }}>    
                            <img src={profileImg} className="material-icons"/></button>
                    <span className="myNotes">My Notes</span>
                    <button className="addNote" onClick= { addNote } ><span className="material-icons">note_add</span></button>
            </div>
    );
}

 
export default TopLeft;

// "document.getElementById('editP').style.display ='block'"