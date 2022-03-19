import React, { Component } from 'react';
import TopRight from './topR'
import BottomRight from './bottomR'
import Tags from './tag';

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
            <Tags/>
        </div>
    );
};
 
export default Right;