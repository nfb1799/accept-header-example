const http = require('http');
const url = require('url');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': responseHandler.getIndex,
    '/cats': responseHandler.getCats,
    index: responseHandler.getIndex
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
    const acceptedTypes = request.headers.accept.split(','); //Splits strings at commas (comes in as array)

    if(urlStruct[parsedUrl.pathname]) { //if it exists then true, else false
        urlStruct[parsedUrl.pathname](request, response, acceptedTypes); //urlStruct[parsedUrl.pathname] is a function
    } else {
        urlStruct.index(request, response); //normally, a 404 page would go here
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
