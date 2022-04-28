import React, { useEffect, useState} from 'react';
import profileImg from './defaultpImg.jpg'
import {getCurrentUserAPIMethod, updateUserAPIMethod, uploadImageToCloudinaryAPIMethod} from "../api/client";
import {userLogoutMethod} from "../api/client";

function EditProfile({user,setUser,userProfile, updateUserProfile}){

    // const[userProfile, updateUserProfile] = useState([])

    useEffect(() => {    //retreiving all userProfile GET
        function fetchData() {
            getCurrentUserAPIMethod().then((userProfile) => { 
            updateUserProfile(userProfile);
            }).catch((err) => {
                console.error('Error retrieving note data: ' + err);
            });
        };
        fetchData();
      }, []);

    const handleChangeProfile = (e)=>{ //Update PUT
        updateUserProfile((prevValues)=>(
            {...prevValues, [e.target.name] : e.target.value }))
    }
    const handleImageSelected = (event) => {
        console.log("New File Selected");
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            console.dir(selectedFile);

            const formData = new FormData();
            // TODO: You need to create an "unsigned" upload preset on your Cloudinary account
            // Then enter the text for that here.
            const unsignedUploadPreset = 'pyf8kc0j'
            formData.append('file', selectedFile);
            formData.append('upload_preset', unsignedUploadPreset);

            console.log("Cloudinary upload");
            uploadImageToCloudinaryAPIMethod(formData).then((response) => {
                console.log("Upload success");
                console.dir(response);
                const updatedProfile = {...userProfile, "profile_url": response.url};
                updateUserProfile(updatedProfile); 
            });
        }
    }
    const handleRemoveImage = () =>{
        const updatedProfile = {...userProfile, "profile_url": ""};
        updateUserProfile(updatedProfile);
    }
    const onSave = (e) =>{
        alert("Saved");
        updateUserAPIMethod(userProfile).then((response) => {
            console.log("Updated userProfile on the server");
        }).catch(err => {
          console.log(userProfile)
          console.error('Error updating userProfile data: ' + err);
        })
        closeModal();
    }
    const closeModal = () =>{
        document.getElementById('editP').style.display= "none";
      }
    const handleLogout = () => {
        console.log("CLicked",userProfile);
        userLogoutMethod(userProfile).then((response) => {
            console.log("Logged out");
            setUser('');
            console.log(user);
        }).catch(err => {
          console.log(userProfile)
          console.error('Error Logging out: ' + err);
        })
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
                        {userProfile.profile_url?
                            <img src={userProfile.profile_url} alt="profile"/>:
                            <img src={profileImg} />
                        }

                            <input type="file" id="file-input" onChange={handleImageSelected}></input>
                            <label htmlFor="file-input" style={{fontSize:'15px'}} className="handleImageBtn"><span>Add New Image</span></label>
                            {/* <button><span>Add New Image</span></button> */}
                            <button onClick={handleRemoveImage} className="handleImageBtn"><span>Remove Image</span></button>
                        </div>
                        <div className="p2">
                            Name<br/> <input type="text" id="Name"  name="Name" value={userProfile.Name ? userProfile.Name : ''}
                                                onChange={handleChangeProfile}/><br/>
                            Email<br/> <input type="text" id="Email" size="30" name="Email" value={userProfile.Email ? userProfile.Email : ''}
                                                onChange={handleChangeProfile}/><br/>
                            Color Scheme<br/>
                            <select className ="select" onChange={handleChangeProfile} id="Theme" name="Theme" value = {userProfile.Theme ? userProfile.Theme : ''}>
                                <option value="Light">Light</option>
                                <option value="Dark">Dark</option>
                            </select>
                        </div>
                        <div className="p3">
                            <button onClick = {onSave}><span className="save">Save</span></button>
                            <button onClick={handleLogout}><span>Logout</span></button>
                        </div>
                    </div>
                    {/* </form> */}
                </div>  
            </div>  
    );
}
 
export default EditProfile ;