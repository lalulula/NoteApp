import { response } from 'express';
import React , { useState }   from 'react';
import { userRegisterMethod, userLoginMethod, getCurrentUserAPIMethod} from "../api/client";

function LoginPage({user,setUser}){
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const errorStyle={
        fontSize: '15px',
        color: 'red',
        margin: '10px 0px 0px 0px'
    };


    window.onclick = function(event) {
       if (event.target === document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
        }
    }
    const closeModal = () =>{
        document.getElementById('myModal').style.display= "none";
      }
    const handleCreateNewAccount = () =>{
       document.getElementById('myModal').style.display='block'
    }

    const handleSubmitForm=(e)=>{
        e.preventDefault()
    }
    
    const handleChangeEmail = (e) =>{
        const val = e.target.value;
        setEmail(val);
    }
    const handleChangePwd = (e) =>{
        const val = e.target.value;
        setPwd(val);
    }
    const handleChangeName = (e) =>{
        const val = e.target.value;
        setName(val);
    }
    const handleLogin = async ()=>{
        try {
            await userLoginMethod({Email: email, password: pwd});
            const userInfo = await getCurrentUserAPIMethod();
            setUser(userInfo);
            console.log("userInfo", userInfo);
        } catch (err){
            console.error('Error updating user data: ' + err);
            setErrorMessage("Error: Invalid email and/or password");
        }
    }
    // const handleLogin = ()=>{
    //     userLoginMethod({Email: email, password: pwd}).then((response)=>{
    //         setUser(response);
    //     })
    // }

    const handleRegister = async ()=>{
        console.log("Email",email);
        console.log("password", pwd);
        console.log("Name", name);
        try {
            await userRegisterMethod({Email: email, password: pwd, Name: name});
            const userInfo = await getCurrentUserAPIMethod();
            setUser(userInfo);
            console.log("userInfo", userInfo);
        } catch (err){
            console.error('Error updating user data: ' + err);
        }
    }

    return(
    <div className='loginBody'>
        <div className="bodyContainer">
            <div className="loginContainer">

                <div className="loginHeader">
                    <h1 className="loginTitle">Notes</h1>
                    <h3 style={{marginBottom: '30px'}}>Organize all your thoughts in one place</h3> 
                </div>

                <form onSubmit={handleSubmitForm}>
                    <div className="loginForm">
                        <label htmlFor="email">Email</label>
                        <input className="loginInput email" type="email" name="Email" onChange={handleChangeEmail} style={{width: '98%'}}/><br/>

                        <label htmlFor="password">Password</label>
                        <input className="loginInput" type="password" name="password" onChange={handleChangePwd} autoComplete="off" style={{width: '98%'}} /><br/>
                        {errorMessage && pwd &&
                        <div id="errorMessage" style={errorStyle}>{errorMessage}</div>}
                        <div id="errorMessage" style={errorStyle}></div>

                            <div className="loginButtons">
                                <button className="login" onClick={handleLogin} >Log in</button>
                                <hr style={{marginBottom: '20px'}}/>
                                <button className="createAccount" onClick={handleCreateNewAccount}>Create New Account</button>
                            </div>
                    </div>
                </form>
            </div>

            <div id="myModal" className="loginModal">
                <div className="modal-content">
                    <div className="editLoginContainer">
                        
                        <div className="signUp1">
                            <h3>Sign Up</h3>
                            <span className="close" onClick={closeModal}>&times;</span>
                        </div>

                        <form onSubmit={handleSubmitForm}>
                            Name<br/> <input type="text" name="Name" onChange={handleChangeName} autoComplete="off"  style={{width: "98%", height:"20px"}}/>
                            Email<br/> <input type="email" size="30" name="Email" onChange={handleChangeEmail} autoComplete="off"  style={{width: "98%", height:"20px"}}/>
                            Password<br/> <input type="password" size="30" name="password"  onChange={handleChangePwd} autoComplete="off" style={{width: "98%", height:"20px"}}/>

                            <div className="signUp2">
                            <button className="signUpBtn" onClick={handleRegister}> Sign Up </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
    );
}
 
export default LoginPage;