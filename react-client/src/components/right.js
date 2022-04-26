import React from 'react';
import TopRight from './topR'
import BottomRight from './bottomR'

function Right({ notes, setSelectedNoteId , deleteNote, selectedNote,  back2SideBar, onEditNote, ifSmallScreen, showSideBar}){

    return(
        <div className="right" 
            style={ifSmallScreen? 
                    {display: showSideBar? 'none': 'block'}: 
                    {display:'block'}}
                    >
            <TopRight 
                    notes={ notes }
                    deleteNote={ deleteNote }
                    back2SideBar={ back2SideBar }
                    note2Delete = {selectedNote}/>
            <BottomRight 
                    notes = {notes}   
                    selectedNote = { selectedNote } 
                    setSelectedNoteId={setSelectedNoteId}
                    onEditNote = { onEditNote }
                    tags = {selectedNote ? selectedNote.tags: [] }
                    />
        </div>
    );
};
 
export default Right;