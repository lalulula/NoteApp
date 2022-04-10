import React from "react";
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
            _id: selectedNote._id,
            text: selectedNote.text,
            lastUpdatedDate: Date.now(),
            tags: [...tags.filter((tag,index) => index !== i)]
        });
    }

    const handleAddition = (tag) =>{
            onEditNote({
                _id: selectedNote._id,
                text: selectedNote.text,
                lastUpdatedDate: Date.now(),
                tags: [...tags,tag]
            });
    }
    const handleDrag = (tag, currPos, newPos) => {     
        const newTags = [...tags].slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        onEditNote({
            _id: selectedNote._id,
            text: selectedNote.text,
            lastUpdatedDate: Date.now(),
            tags: newTags
        });
      };
    
    return(
            <div className='tagContainer'>
                    <ReactTags  tags={tags} key ={tags._id} placeholder={"Enter a tag"} handleAddition ={handleAddition} 
                                handleDelete={handleDelete} handleDrag={handleDrag} className="tag" 
                                autoFocus = {false} inline={true} allowDeleteFromEmptyInput={false}
                                allowUnique={false}
                                />
            </div>    

    );
}
export default Tags;