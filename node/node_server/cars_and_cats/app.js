const http = require('http');
const fs = require('fs');
const server = http.createServer((request, response) => {
    if(request.url === '/cars') {
        fs.readFile('views/cars.html', 'utf8', (errors, contents) => {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    // else if(request.url === '/images/car1.jpeg'){
    //     // notice we won't include the utf8 encoding
    //     fs.readFile('./images/car1.jpeg', function(errors, contents){
    //         response.writeHead(200, {'Content-type': 'image/jpeg'});
    //         response.write(contents);
    //         response.end();
    //     })
    // }
    // else if(request.url === '/images/car2.jpeg'){
    //     // notice we won't include the utf8 encoding
    //     fs.readFile('./images/car2.jpeg', function(errors, contents){
    //         response.writeHead(200, {'Content-type': 'image/jpeg'});
    //         response.write(contents);
    //         response.end();
    //     })
    // }
    // else if(request.url === '/images/car3.jpeg'){
    //     // notice we won't include the utf8 encoding
    //     fs.readFile('./images/car3.jpeg', function(errors, contents){
    //         response.writeHead(200, {'Content-type': 'image/jpeg'});
    //         response.write(contents);
    //         response.end();
    //     })
    // }
    else if(request.url === '/cats') {
        fs.readFile('views/cats.html', 'utf8', (errors, contents) => {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    // else if(request.url === '/images/cat1.jpeg'){
    //     // notice we won't include the utf8 encoding
    //     fs.readFile('./images/cat1.jpeg', function(errors, contents){
    //         response.writeHead(200, {'Content-type': 'image/jpeg'});
    //         response.write(contents);
    //         response.end();
    //     })
    // }
    // else if(request.url === '/images/cat2.jpeg'){
    //     // notice we won't include the utf8 encoding
    //     fs.readFile('./images/cat2.jpeg', function(errors, contents){
    //         response.writeHead(200, {'Content-type': 'image/jpeg'});
    //         response.write(contents);
    //         response.end();
    //     })
    // }
    // else if(request.url === '/images/cat3.jpeg'){
    //     // notice we won't include the utf8 encoding
    //     fs.readFile('./images/cat3.jpeg', function(errors, contents){
    //         response.writeHead(200, {'Content-type': 'image/jpeg'});
    //         response.write(contents);
    //         response.end();
    //     })
    // }
    else if(request.url === '/cars/new'){
        fs.readFile('views/new.html', 'utf8', function(errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(contents); 
            response.end();
        });
    }
    else if(request.url === '/stylesheets/style.css'){
        fs.readFile('./stylesheets/style.css', 'utf8', function(errors, contents){
            response.writeHead(200, {'Content-type': 'text/css'});
            response.write(contents);
            response.end();
        })
    }
    else if(request.url.startsWith('/images')){
        console.log("Request url: "+request.url);
        fs.readFile(request.url.substring(1), (errors, contents) => {
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents); 
            response.end();
        });
    }
    else {
        response.end('The URL requested is not available');
    }
});
server.listen(7077);