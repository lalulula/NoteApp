import React from "react";

function Tags({tags, saveTag, deleteTag, selectedNote}){
    if(!selectedNote) {
        return (
            <div className='tagContainer' style={{background:'transparent'}}>
            </div>
        )
    }
    return(
        <div className='tagContainer'>
            {tags.map( (tag, index) =>
            {return (
                    <div key={index} className="tag" autofocus = {false}>
                        {tag}<span onClick={()=>deleteTag(tag)}>x</span>
                    </div>
                        ); 
            })}
            <input placeholder="Enter a tag" onKeyDown={saveTag} />
        </div>    
    );
}
export default Tags;




