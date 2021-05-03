import jwt_decode from "jwt-decode";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

const ENDPOINT ='http://localhost:8084/client/login';

export const loginUser = (user,dispatch,seterror) =>{ //login
if(user != null){
  fetch(`${ENDPOINT}`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data) {
        console.log(data);
        const token = data.address;
        console.log(token);
        sessionStorage.setItem("jwt", token);
        sessionStorage.setItem("email",user.email);
        sessionStorage.setItem("name",data.name);
        const decoded = jwt_decode(token);
        seterror("")
        dispatch(setCurrentUser(decoded));
      } else {
        seterror(data.err.message)
        logoutUser(dispatch);
      }
    })
    .catch(err => {
      logoutUser(dispatch);
    });

  }
}

export const setCurrentUser = decoded => {//si se loguea , setear datos del usuario
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = (dispatch) => {//logout
  sessionStorage.removeItem("jwt2");
  sessionStorage.removeItem("jwt");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("name");

  console.log(localStorage.getItem("jwt"));
  dispatch(setCurrentUser({}));
};
