const http = require('http');
const url = require('url');
const TimestampService = require('./timestamp');

const server = http.Server(requestHandler);

function requestHandler(req, res) {
    let query = formatPathAndDecode(url.parse(req.url).pathname);
    let timestamp = new TimestampService();
    let result = timestamp.parse(query);
    res.write(JSON.stringify(result));
    res.end();
}

// return only top level path and decode URI
function formatPathAndDecode(path) {
    return decodeURI(path.substr(1, path.length - 1).split('/')[0]);
}

server.listen(3000, () => console.log('Server Running On Port: 3000'));
