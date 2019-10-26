// let http = require('http');
// let server = new http.Server();

// server.on('request',function(req,res){
//    res.end('Hello, User!'); 
// });

// server.listen(8080);

const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`)
  })
  ws.send('ho!')
})