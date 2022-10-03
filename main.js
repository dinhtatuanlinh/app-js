let http = require("http");
require("dotenv").config()

//axios
global.__base = __dirname + '/';
global.__pathFrameWork = __base + 'frame_work/';

// let app = require(__pathFrameWork + 'app')
let service = http.createServer(function(req, res){
    console.log(req.method)
    // midleware()
    if(req.method === 'GET'){
        switch(req.url){
            case "/":
                console.log("service!!!!")
                let data = {
                    name: "linh",
                    email: "dttl@gmail.com"
                }
                res.writeHead(200, {'Content-Type':'application/json' })
                res.end(JSON.stringify(data))
            default:
                res.writeHead(404, {'Content-Type':'application/json' })
                res.end("404 not found!!!")
        }
    } else if(req.method === 'POST'){
        switch(req.url){
            case "/delete-data":
                break
            case "/login":
                login(req, res)
                break
            case "/register":
                register(req, res)
                break
            default:
                res.writeHead(404, {'Content-Type':'application/json' })
                res.end("404 not found!!!")
        }
    }
});

console.log(process.env.PORT)
let Port = normalizePort(process.env.PORT || 8988);
service.listen(
    Port,
    console.log(
        `service on: http://localhost:${Port}`
    )
);
service.on("error", onError);
service.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = typeof Port === "string" ? "Pipe " + Port : "Port " + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    let addr = service.address();
    let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("Listening on " + bind);
}
let user = {
    username: "dinhtatuanlinh",
    password: "123456"
}
function getData(req){
    return new Promise((resolve, reject)=>{
        req.on("data", (chunk) => {
            
            let str = decodeURIComponent(escape(String.fromCharCode(...chunk)))
            resolve(JSON.parse(str))
        });
    })
}

async function login(req, res){
    let data = await getData(req)
    console.log(data)
    if(data.username !== user.username && data.password !== user.password){
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end("error input")
    }

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(data))
}