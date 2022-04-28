// import axios from 'axios';
const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
}
//////////////////////////Login////////////////////////////////////////////////////
export const userLoginMethod = (user) => {
    console.log(user);
    console.log(JSON.stringify(user));
    return fetch(`/api/login`, {
        ...defaultHeaders,
        method: 'POST', 
        body: JSON.stringify(user),
    }).then(checkStatus)
    // .then(parseJSON);
}
export const userRegisterMethod = (user) => {
    return fetch(`/api/register`, {
        ...defaultHeaders,
        method: 'POST', 
        body: JSON.stringify(user),
    }).then(checkStatus)
        .then(parseJSON);
}
export const userLogoutMethod = (user) => {
    return fetch(`/api/logout`, {
        ...defaultHeaders,
        method: 'POST', 
        body: JSON.stringify(user),
    }).then(checkStatus)
        // .then(parseJSON);
}
//////////////////////////Note///////////////////////////////////////////////////////////
// More on the fetch method: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
export const getNotesAPIMethod = () => {
    return fetch(`/api/notes`, {
        ...defaultHeaders,              // The method defaults to GET
    }).then(checkStatus)
        .then(parseJSON);
}

export const createNoteAPIMethod = (note) => {
    return fetch(`/api/notes`, {
        ...defaultHeaders,
        method: 'POST', 
        body: JSON.stringify(note),
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateNoteAPIMethod = (note) => {
    return fetch(`/api/notes/${note._id}`, {
        ...defaultHeaders,
        method: 'PUT', 
        body: JSON.stringify(note),
    }).then(checkStatus);
}

export const deleteNoteByIdAPIMethod = (noteId) => {
    return fetch(`/api/notes/${noteId}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}
///////////////////////////User//////////////////////////////////////////////////////////////////////////////
export const getUserAPIMethod = () => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
        // The method defaults to GET
    }).then(checkStatus)
        .then(parseJSON);
}

export const getCurrentUserAPIMethod = () => {
    return fetch(`/api/users/currentUser`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}
// export const getUserByIdAPIMethod = (userId) => {
//     return fetch(`/api/users/${userId}`, {
//         ...defaultHeaders,
//     }).then(checkStatus)
//         .then(parseJSON);
// }


export const updateUserAPIMethod = (user) => {
    return fetch(`/api/users/${user._id}`, {
        ...defaultHeaders,
        method: 'PUT', 
        body: JSON.stringify(user),
    }).then(checkStatus);
}

export const createUserAPIMethod = (user) => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
        method: 'POST', 
        body: JSON.stringify(user),
    }).then(checkStatus)
        .then(parseJSON);
}


export const uploadImageToCloudinaryAPIMethod = (formData) => {
    const cloudName = 'yunahkim' // TODO: Write in your own Cloudinary account
    return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
    }).then(checkStatus)
        .then(parseJSON);
}

// export const deleteUserByIdAPIMethod = (userId) => {
//     return fetch(`/api/users/${userId}`, {
//         ...defaultHeaders,
//         method: 'DELETE',
//     }).then(checkStatus)
//         .then(parseJSON);
// }




function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}