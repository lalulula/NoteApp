import React, { Component } from 'react';
import TopRight from './topR'
import BottomRight from './bottomR'
import Tags from './tag';

function Right({ notes , deleteNote, selectedNote,  back2SideBar, note2Delete, onEditNote, tags, saveTag, deleteTag, ifSmallScreen, showSideBar }){

    return(
        <div className="right" 
            style={ifSmallScreen? 
                    {display: showSideBar? 'none': 'block'}: 
                    {display:'block'}}>
            <TopRight 
                    notes={ notes }
                    deleteNote={ deleteNote }
                    back2SideBar={ back2SideBar }
                    note2Delete = {note2Delete}/>
            <BottomRight 
                    selectedNote = { selectedNote } 
                    onEditNote = { onEditNote }
                    tags = {tags}
                    saveTag = {saveTag}
                    deleteTag ={deleteTag} />
        </div>
    );
};
 
export default Right;