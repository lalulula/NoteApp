import React, { Component } from 'react';
import profileImg from './profileImg.jpg'
class EditProfile extends Component {
    state = {  } 
    render() { 
        return (
            <div id="editP" className="modal">
                <div className="modal-content">
                    <div className="editContainer">
                        <div className="p0">
                            <h3>Edit profile</h3>
                            <button onClick="document.getElementById('editP').style.display='none'"
                                    className="close" title="Close Modal"><span className="material-icons">close</span></button>
                        </div>
                        <div className="p1">
                        <img src={profileImg} />
                            <button><span>Add New Image</span></button>
                            <button><span>Remove Image</span></button>
                        </div>
                        <div className="p2">
                            Name<br/> <input type="text" name="name"/><br/>
                            Email<br/> <input type="text" size="30" name="email"/><br/>
                            Color Scheme<br/>
                            <select id="theme">
                                <option value="Light">Light</option>
                                <option value="Dark">Dark</option>
                            </select>
                        </div>
                        <div className="p3">
                            <button><span className="save">Save</span></button>
                            <button><span>Logout</span></button>
                        </div>
                    </div>
                </div>  
            </div>
        );
    }
}
 
export default EditProfile ;