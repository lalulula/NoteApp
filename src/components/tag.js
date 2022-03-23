import React, { useState } from "react";
import {DraggableArea} from 'react-draggable-tags'


function Tags({tags, selectedNote, onEditNote}){

    if(!selectedNote||!tags) {
        return (
            <div className='tagContainer' style={{background:'transparent'}}>
            </div>
        )
    }
    const deleteTag = (tag2Delete)=>{
        console.log("Clicked")
        onEditNote({
            id: selectedNote.id,
            text: selectedNote.text,
            date: Date.now(),
            tags: [...(tags.filter( (tag) => tag !== tag2Delete))]
        });
    }

    const saveTag = (e) =>{
        if(e.key ==="Enter"&&(e.target.value.length>0)){
        onEditNote({
            id: selectedNote.id,
            text: selectedNote.text,
            date: Date.now(),
            tags: [...selectedNote.tags,e.target.value]
        });
        e.target.value='';
        }
    }
    return(
            <div className='tagContainer'>
                {tags.map( (tag, index) =>
                {return (
                        <div key={index}  className="tag" autoFocus = {false}>
                            {tag}<span onClick={()=>deleteTag(tag)}>x</span>
                        </div>
                            ); 
                })}
                <input placeholder="Enter a tag" onKeyUp={saveTag} />
            </div>    

    );
}
export default Tags;
