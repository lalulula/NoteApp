import React  from 'react';

function LoginPage({user, setUser}){
      window.onclick = function(event) {
        if (event.target === document.getElementById('myModal')) {
          document.getElementById('myModal').style.display = "none";
        }
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    const closeModal = () =>{
        document.getElementById('myModal').style.display= "none";
      }
      const handleCreateNewAccount = () =>{
        document.getElementById('myModal').style.display='block'
      }



    return(
        <div className='loginBody'>
        <div className="bodyContainer">
            <div className="loginContainer">

                <div className="loginHeader">
                    <h1 className="loginTitle">Notes</h1>
                    <h3 style={{marginBottom: '30px'}}>Organize all your thoughts in one place</h3> 
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="loginForm">
                        <label for="email">Email</label>
                        <input className="loginInput email" type="email" name="email" style={{width: '98%'}}/><br/>

                        <label for="password">Password</label>
                        <input className="loginInput" type="password" name="password" style={{width: '98%'}} /><br/>

                            <div className="loginButtons">
                                <button className="login" >Log in</button>
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

                    <form>
                        Name<br/> <input type="text" name="name" style={{width: "98%", height:"20px"}}/>
                        Email<br/> <input type="email" size="30" name="email" style={{width: "98%", height:"20px"}}/>
                        Password<br/> <input type="password" size="30" name="password" style={{width: "98%", height:"20px"}}/>

                        <div className="signUp2">
                        <button className="signUpBtn"> Sign Up </button>
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