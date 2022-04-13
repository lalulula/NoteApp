import React  from 'react';

function Search({ handleSearchText,notes,setSelectedNoteId, selectedNote}){
    const clearSearchBar =() =>{
        document.getElementById('searchBar').value='';
        handleSearchText('');
        setSelectedNoteId('')
        document.getElementById('clearSearchBtn').style.color='transparent'
    }

    const handleOnChange=(e)=>{
        handleSearchText(e.target.value);
        console.log(notes)
        console.log(selectedNote)
        if(notes.length === 0){
            return;
        }
        else{
            setSelectedNoteId(notes[0]._id);
        }
        document.getElementById('clearSearchBtn').style.color='steelblue';
    }
    return(
        <div className= "search">
                        <span className="material-icons">search</span>
                        <input id="searchBar" onChange={handleOnChange} onClick={handleOnChange} disabled={selectedNote ? false : true} type="text" name="search" placeholder="Search all notes"
                                  style={{border: 'none', marginTop: '10px', marginBottom: '10px'}} 
                                  autoComplete="off"/>
                        <button id="clearSearchBtn" style={{color:"transparent"}} onClick= {clearSearchBar}>✖</button>
                    </div>
    );
};
 
export default Search;
