import React from 'react';
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
                            Name<br/> <input type="text" id="pName"  name="pName" value={formValues.pName||''}
                                                onChange={handleChangeProfile}/><br/>
                            Email<br/> <input type="text" id="pEmail" size="30" name="pEmail" value={formValues.pEmail||''}
                                                onChange={handleChangeProfile}/><br/>
                            Color Scheme<br/>
                            {/* <select className ="select" onChange={handleThemeChange} value = {theme}> */}
                            <select className ="select" name = "pTheme" onChange={handleChangeProfile} value = {formValues.theme||''}>
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
 
export default EditProfile ;