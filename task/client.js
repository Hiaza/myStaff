// let http = require('http');


// let req = http.request({
//     hostname: 'localhost',
//     port:8080
// });

// req.on('response', function(response){
//     let body = '';
//     response.on('data', function(chunk){
//         body += chunk;
//     });
//     response.on('end', function(){
//         console.info(body);
//     })
// })
// req.end();
const WebSocket = require('ws')
const url = 'wss://flavio-websockets-server-example.glitch.me'
const connection = new WebSocket(url)

connection.onopen = () => {
  connection.send('hey') 
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
  console.log(e.data)
}