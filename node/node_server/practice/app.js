// THIS ONLY INCLUDES THE ROOT ROUTE

//const http = require('http');
// const fs = require('fs');
// const server = http.createServer(function (request, response){
//     console.log('client request URL: ', request.url);
    
//     // this is how we do routing:
//     if(request.url === '/') {
//         fs.readFile('index.html', 'utf8', function (errors, contents){
//             response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
//             response.write(contents);  //  send response body
//             response.end(); // finished!
//         });
//     }
//     // request didn't match anything:
//     else {
//         response.writeHead(404);
//         response.end('File not found!!!');
//     }
// });
// // tell your server which port to run on
// server.listen(6789);
// // print to terminal window
// console.log("Running in localhost at port 6789");


//THIS INCLUDES THE /DOJO.HTML

const http = require('http');
const fs = require('fs');
const server = http.createServer((request, response) => {
    if(request.url === '/') {
        fs.readFile('index.html', 'utf8', (errors, contents) => {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    else if (request.url === "/dojo") {
         fs.readFile('dojo.html', 'utf8', (errors, contents) => {
             response.writeHead(200, {'Content-type': 'text/html'});
             response.write(contents); 
             response.end();
         });
    }
    else {
        response.end('File not found!!!');
    }
});
server.listen(6789);
console.log("listening on port 6789");
