const server = require('http').createServer();
const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;

var admin = require("firebase-admin");
var serviceAccount = require("./firebaseServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ochat-8f9e5.firebaseio.com"
});

const { grpcResolver, userClient } = require("./grpc")

io.use(async (socket, next) => {
    if (!socket.handshake.query.token) {
        next(new Error("Failed to authenticate."));
    }

    await admin.auth().verifyIdToken(socket.handshake.query.token)
        .then((decodedToken) => {
            console.log("SUCCESS")
            socket.uid = decodedToken.uid
            next();
        }).catch((error) => {
            console.log("auth Failed")
            console.log(error)

            next(new Error("Failed to authenticate."));
        });
}).on('connection', socket => {
    console.log("User connected, Socket ID: ", socket.id)
    console.log("uid: ", socket.uid)

    if (!socket.uid) {
        //TO-DO - implement error here:
        new Error("Failed to authenticate2.")
    }

     grpcResolver(
        {
            grpcClient: userClient,
            grpcFunction: 'GetUser',
            authentication: { uid: socket.uid },
            requestParams: { uid: socket.uid },
            onSuccess: (result) => {
                console.log("CURRENT USER: ", result)
                io.to(socket.id).emit("LOAD_CURRENT_MEMBER", result)
                socket.join("1")
                socket.join("2")
                console.log("CAME HERE")
                io.to(socket.id).emit("LOAD_CHAT_LIST", [{ roomId: "1", chatMessages: [], participants: [{ name: "Bill Pooper", imageUrl: "https://i.pinimg.com/564x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg" }] }, { roomId: "2", chatMessages: [], participants: [{ name: "Jilly Silly", imageUrl: "https://avatarfiles.alphacoders.com/165/165325.jpg" }] }]);
            
                return result
            }
        }
    )

    socket.on("CHAT_MESSAGE_SEND", (message) => {
        console.log(message)
        io.in(message.roomId).emit("CHAT_MESSAGE_RECEIVED", message)
    })

});

server.listen(PORT, () => {
    console.log("Socket IO Server Connected to port: " + PORT);
});

