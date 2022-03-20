import React, { Component } from 'react';

import TopLeft from './topL'
import BottomLeft from './bottomL'

function Left({ notes , addNote, profileClicked, selectedNote, handleSelectedNote }){

    return(
        <div className = "left">  
            <TopLeft 
                addNote = { addNote } 
                profileClicked = { profileClicked }/>
            <BottomLeft 
                notes = { notes }
                selectedNote ={ selectedNote }
                handleSelectedNote ={ handleSelectedNote }/>
        </div>
    );
};
 
export default Left;
