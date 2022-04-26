import React from 'react';
import profileImg from './defaultpImg.jpg'

function TopLeft({addNote ,  profileClicked, userProfile }){

    return(
            <div className="topL"> 
                    <button onClick= { profileClicked }
                            style={{width: 'auto', margin: 0, }}> 

                        {userProfile.profile_url?
                            <img src={userProfile.profile_url} alt="profile"/>:
                            <img src={profileImg} />
                        }
                            {/* <img src={profileImg} className="material-icons"/> */}
                            </button>
                    <span className="myNotes">My Notes</span>
                    <button className="addNote" onClick= { addNote } ><span className="material-icons">note_add</span></button>
            </div>
    );
}

 
export default TopLeft;
