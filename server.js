// Import dependencies
//--------------------------------------------------------
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

// capture server object from express with http
//--------------------------------------------------------
const server = require("http").createServer(app);
// create new socketIO instance
//--------------------------------------------------------
const io = require("socket.io")(server);

// Handle SocketIO request
//--------------------------------------------------------
io.of("chat").on("connection", socket => {
// handle connection event
    console.log("new user")
    // handle new message event
    socket.on("new-message", data => {
        // send message to all client in chat
        io.of("chat").emit("new-message", data);
    })

})
// Configure Express
//--------------------------------------------------------

// allow express to use static files
app.use(express.static( path.join(__dirname, "/public") ));

// serve index.html
app.get("/", (req, res) => {
    res.send("index.html")
});

// Start app
//--------------------------------------------------------
server.listen(PORT, () => console.log(`listen to port: ${PORT}`))
