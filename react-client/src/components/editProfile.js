import React, { useEffect, useState} from 'react';
import profileImg from './profileImg.jpg'
import {getUserAPIMethod,getCurrentUserAPIMethod, updateUserAPIMethod} from "../api/client";

function EditProfile(){

    const[formValues, updateFormValues] = useState([])

    useEffect(() => {    //retreiving all formValues GET
        function fetchData() {
            getCurrentUserAPIMethod().then((formValues) => { 
            updateFormValues(formValues);
            }).catch((err) => {
                console.error('Error retrieving note data: ' + err);
            });
        };
        fetchData();
      }, []);

    const handleChangeProfile = (e)=>{ //Update PUT
        updateFormValues((prevValues)=>(
            {...prevValues, [e.target.name] : e.target.value }))
    }
    const onSave = (e) =>{
        alert("Saved");
        updateUserAPIMethod(formValues).then((response) => {
            console.log("Updated user on the server");
        }).catch(err => {
          console.log(formValues)
          console.error('Error updating user data: ' + err);
        })
        closeModal();
        console.log(formValues)
    }
    const closeModal = () =>{
        document.getElementById('editP').style.display= "none";
      }

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
                            Name<br/> <input type="text" id="Name"  name="Name" value={formValues.Name ? formValues.Name : ''}
                                                onChange={handleChangeProfile}/><br/>
                            Email<br/> <input type="text" id="Email" size="30" name="Email" value={formValues.Email ? formValues.Email : ''}
                                                onChange={handleChangeProfile}/><br/>
                            Color Scheme<br/>
                            <select className ="select" onChange={handleChangeProfile} id="Theme" name="Theme" value = {formValues.Theme ? formValues.Theme : ''}>
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