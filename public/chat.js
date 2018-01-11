// Declaring variable
//--------------------------------------------------------
var socket;
var doc = window.document;
var messageBoxDOM = doc.getElementById("message-box");
var nameInputDOM = doc.getElementById("message-name");
var bodyInputDOM = doc.getElementById("message-body");
var submitInputDOM = doc.getElementById("message-submit");


// Handle SocketIO Connection
//--------------------------------------------------------
var socket = io("/chat");
// open up connection
socket.on("new-message", data => {
       // create new p element
       let pDOM = doc.createElement("p");
       // set add message to p content
       let newMessage = data.name + ": " + data.body;
       pDOM.innerHTML = newMessage;
       // append to message box
       messageBoxDOM.appendChild(pDOM); 
});
        
// Handle onSubmit
//--------------------------------------------------------
var handleSubmit = ev => {
    ev.preventDefault();
    // Grab values from name and body inputs
    let name = nameInputDOM.value;
    let body = bodyInputDOM.value;
    
    // create message object
    let message = {
        name: name,
        body: body
    };
    // emit msg to server
    socket.emit("new-message", message);
};

submitInputDOM.addEventListener("click", handleSubmit);
