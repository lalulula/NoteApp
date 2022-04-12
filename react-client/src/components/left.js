import React  from 'react';

import TopLeft from './topL'
import BottomLeft from './bottomL'

function Left({notes , addNote, profileClicked,selectedNote, selectedNoteId, handleSelectedNote, handleSearchText , setSelectedNoteId,ifSmallScreen,showSideBar}){

    return(
        
        <div className = "left"
                style={ifSmallScreen? 
                    {display: showSideBar? 'block':'none'}: 
                    {display:'block'}}
                >  
            <TopLeft 
                addNote = { addNote } 
                profileClicked = { profileClicked }/>
            <BottomLeft 
                notes = { notes }
                selectedNoteId ={ selectedNoteId }
                selectedNote={selectedNote}
                handleSelectedNote ={ handleSelectedNote }
                handleSearchText={handleSearchText}
                setSelectedNoteId={setSelectedNoteId}

                />
        </div>
    );

};
 
export default Left;
