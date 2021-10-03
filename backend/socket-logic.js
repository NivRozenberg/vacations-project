const io = require("socket.io");
const vacations_dal = require("./data-access-layer/vacations-dal");

let socketsManager;



function start(listener) {

    // Connect once to socket.io library:
    socketsManager = io(listener, { cors: { origin: "http://localhost:3000" } });
    // שלב 1 בדיאגרמה

    // socketsManager = io(listener, { cors: { origin: "*" } });

    // Listen to any client connection: 
    // תאזין לחיבורים מקליינטים
    socketsManager.sockets.on("connection", socket => {


        console.log("One client has been connected.");


        // כאשר קליינט מתנתק
        socket.on("disconnect", () => {
            console.log("One client disconnect.");
        });


        // כאשר קליינט שולח הודעה לגבי עדכון או הוספה של חופשה
        socket.on("msg-from-client", msg => {
            console.log("Client sent message: ", msg);
            socketsManager.sockets.emit("msg-from-server", msg);

        });


        // כאשר קליינט שולח הודעה לגבי מחיקת חופשה
        socket.on("msg-from-client-delete", id => {
            console.log("Client sent message: ", id);
            socketsManager.sockets.emit("msg-from-client-delete", id);
        });


        // socket.on("msg-from-client-add", vacation => {
        //     console.log("Client sent message: ", vacation);
        //     socketsManager.sockets.emit("msg-from-server-add", vacation);
        // });

    });
}

module.exports = {
    start
};