var username='';
const socket = io("ws://localhost:3000");
window.onload= initFunction();
 // connect to server



 function initFunction(){
     console.log('Init function');
    const sessionID = localStorage.getItem("sessionID");
    console.log('session id '+sessionID);
    if (sessionID) {
      console.log("Session id is "+sessionID);
      username='vivek';
      
       socket.auth = { sessionID };
       socket.auth.username = { username };
      socket.connect();
    }else{
       console.log("username is "+username);
        username='vivek';
        socket.auth.username = { username };
        socket.connect();
    }
 }//end of function initfunction

function signinbutton(nameentered){
    console.log(`Name setup is ${nameentered}`);
    username=nameentered;
    socket.emit('userlogin',{data: username});
    console.log("After emit ");
}

  socket.on("hello",(arg)=>{
    console.log(arg);
  });

 socket.on("session", ({ sessionID, userID }) => {
  // attach the session ID to the next reconnection attempts
  socket.auth = { sessionID };
  // store it in the localStorage
  console.log("session id is "+JSON.stringify(sessionID));
  localStorage.setItem("sessionID", sessionID);
  // save the ID of the user
  socket.userID = userID;
});