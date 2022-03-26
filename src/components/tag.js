import React, { useState } from "react";
import { WithContext as ReactTags } from 'react-tag-input';
           
function Tags({tags, selectedNote, onEditNote}){

    if(!selectedNote||!tags) {
        return (
            <div className='tagContainer' style={{background:'transparent'}}>
            </div>
        )
    }

    const handleDelete = (i)=>{
        onEditNote({
            id: selectedNote.id,
            text: selectedNote.text,
            date: Date.now(),
            tags: [...tags.filter((tag,index) => index !== i)]
        });
    }

    const handleAddition = (tag) =>{
        console.log(tag)
            onEditNote({
                id: selectedNote.id,
                text: selectedNote.text,
                date: Date.now(),
                tags: [...tags,tag]
            });
    }
    const handleDrag = (tag, currPos, newPos) => {     
        const newTags = [...tags].slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        onEditNote({
            id: selectedNote.id,
            text: selectedNote.text,
            date: Date.now(),
            tags: newTags
        });
      };
    
    return(
            <div className='tagContainer'>
                    <ReactTags  tags={tags} placeholder={"Enter a tag"} handleAddition ={handleAddition} 
                                handleDelete={handleDelete} handleDrag={handleDrag} className="tag" 
                                autoFocus = {false} inline={true} allowDeleteFromEmptyInput={false}
                                allowUnique={false}
                                />
            </div>    

    );
}
export default Tags;