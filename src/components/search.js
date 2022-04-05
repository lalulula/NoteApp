import React  from 'react';

function Search({ handleSearchText,notes,setSelectedNoteId}){
    const clearSearchBar =() =>{
        document.getElementById('searchBar').value='';
        handleSearchText('');
        setSelectedNoteId('')
        document.getElementById('clearSearchBtn').style.color='transparent'
    }

    const handleOnChange=(e)=>{
        handleSearchText(e.target.value);
        setSelectedNoteId(notes[0].id);
        document.getElementById('clearSearchBtn').style.color='steelblue';
    }
    return(
        <div className= "search">
                        <span className="material-icons">search</span>
                        <input id="searchBar" onChange={handleOnChange} type="text" name="search" placeholder="Search all notes"
                                  style={{border: 'none', marginTop: '10px', marginBottom: '10px'}} 
                                  autoComplete="off"/>
                        <button id="clearSearchBtn" style={{color:"transparent"}} onClick= {clearSearchBar}>✖</button>
                    </div>
    );
};
 
export default Search;
