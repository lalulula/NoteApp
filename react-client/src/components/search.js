import React  from 'react';

function Search({clearSearchBar, handleSearchText,notes,setSelectedNoteId, selectedNote}){

    const handleOnClick=()=>{
        document.getElementById('clearSearchBtn').style.color='steelblue';
    }

    const handleOnChange=(e)=>{
        handleSearchText(e.target.value);
        // console.log(notes)
        // console.log(selectedNote)
        if(notes.length === 0){
            return;
        }
        else{
            setSelectedNoteId(notes[0]._id);
        }
        document.getElementById('clearSearchBtn').style.color='steelblue';
    }
    const returnNoteList=()=>{
        document.getElementById('searchBar').value='';
        handleSearchText('');
        clearSearchBar();
    }

    return(
        <div className= "search">
                        <span className="material-icons">search</span>
                        <input id="searchBar" onChange={handleOnChange} onClick={handleOnClick} disabled={selectedNote ? false : true} type="text" name="search" placeholder="Search all notes"
                                  style={{border: 'none', marginTop: '10px', marginBottom: '10px'}} 
                                  autoComplete="off"/>
                        <button id="clearSearchBtn" style={{color:"transparent"}} onClick= {returnNoteList}>✖</button>
                    </div>
    );
};
 
export default Search;
