import React, { Component } from 'react';
import profileImg from './profileImg.jpg'


function EditProfile({ closeModal, onSave, handleChangeProfile, formValues, handleThemeChange, theme}){
    return(
            <div id="editP" className="modal">
                <div className="modal-content">
                    {/* <form > */}
                    <div className="editContainer">
                        <div className="p0">
                            <h3>Edit profile</h3>
                            <button onClick={ closeModal } 
                                    className="close" title="Close Modal"><span className="material-icons">close</span></button>
                        </div>
                        <div className="p1">
                        <img src={profileImg} />
                            <button><span>Add New Image</span></button>
                            <button><span>Remove Image</span></button>
                        </div>
                        <div className="p2">
                            Name<br/> <input type="text" id="pName"  name="pName" value={formValues.pName}
                                                onChange={handleChangeProfile}/><br/>
                            Email<br/> <input type="text" id="pEmail" size="30" name="pEmail" value={formValues.pEmail}
                                                onChange={handleChangeProfile}/><br/>
                            Color Scheme<br/>
                            <select className ="select" onChange={handleThemeChange} value = {theme}>
                                <option value="Light">Light</option>
                                <option value="Dark">Dark</option>
                            </select>
                        </div>
                        <div className="p3">
                            <button onClick = {onSave}><span className="save">Save</span></button>
                            <button><span>Logout</span></button>
                        </div>
                    </div>
                    {/* </form> */}
                </div>  
            </div>  
    );
}

// "document.getElementById('editP').style.display='none'" :close btn style

// class EditProfile extends Component {
//     state = {  } 
//     render() { 
//         return (
//             <div id="editP" className="modal">
//                 <div className="modal-content">
//                     <div className="editContainer">
//                         <div className="p0">
//                             <h3>Edit profile</h3>
//                             <button onClick= "document.getElementById('editP').style.display='none'"
//                                     className="close" title="Close Modal"><span className="material-icons">close</span></button>
//                         </div>
//                         <div className="p1">
//                         <img src={profileImg} />
//                             <button><span>Add New Image</span></button>
//                             <button><span>Remove Image</span></button>
//                         </div>
//                         <div className="p2">
//                             Name<br/> <input type="text" name="name"/><br/>
//                             Email<br/> <input type="text" size="30" name="email"/><br/>
//                             Color Scheme<br/>
//                             <select id="theme">
//                                 <option value="Light">Light</option>
//                                 <option value="Dark">Dark</option>
//                             </select>
//                         </div>
//                         <div className="p3">
//                             <button><span className="save">Save</span></button>
//                             <button><span>Logout</span></button>
//                         </div>
//                     </div>
//                 </div>  
//             </div>
//         );
//     }
// }
 
export default EditProfile ;