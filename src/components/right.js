import React, { Component } from 'react';
import TopRight from './topR'
import BottomRight from './bottomR'

function Right({ notes , deleteNote, selectedNote, onUpdateNote, back2SideBar, note2Delete}){

    return(
        <div className="right">
            <TopRight 
                    notes={ notes }
                    deleteNote={ deleteNote }
                    back2SideBar={ back2SideBar }
                    note2Delete = {note2Delete}/>
            <BottomRight 
                    selectedNote = { selectedNote } 
                    onUpdateNote={ onUpdateNote }/>
        </div>
    );
};
 
export default Right;