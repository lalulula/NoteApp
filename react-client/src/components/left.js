import React  from 'react';

import TopLeft from './topL'
import BottomLeft from './bottomL'

function Left({clearSearchBar, notes , addNote, profileClicked, selectedNote, selectedNoteId, handleSelectedNote, handleSearchText , setSelectedNoteId,ifSmallScreen,showSideBar, userProfile}){

    return(
        
        <div className = "left"
                style={ifSmallScreen? 
                    {display: showSideBar? 'block':'none'}: 
                    {display:'block'}}
                >  
            <TopLeft 
                addNote = { addNote } 
                profileClicked = { profileClicked }
                userProfile={userProfile}/>
            <BottomLeft 
                notes = { notes }
                selectedNoteId ={ selectedNoteId }
                selectedNote={selectedNote}
                handleSelectedNote ={ handleSelectedNote }
                handleSearchText={handleSearchText}
                setSelectedNoteId={setSelectedNoteId}
                clearSearchBar={clearSearchBar}

                />
        </div>
    );

};
 
export default Left;
