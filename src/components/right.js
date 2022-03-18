import React, { Component } from 'react';
import TopRight from './topR'
import BottomRight from './bottomR'

function Right({ notes , deleteNote, selectedNote,  back2SideBar, note2Delete, onEditNote}){

    return(
        <div className="right">
            <TopRight 
                    notes={ notes }
                    deleteNote={ deleteNote }
                    back2SideBar={ back2SideBar }
                    note2Delete = {note2Delete}/>
            <BottomRight 
                    selectedNote = { selectedNote } 
                    onEditNote = { onEditNote }/>
        </div>
    );
};
 
export default Right;