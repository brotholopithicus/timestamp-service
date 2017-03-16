const http = require('http');
const url = require('url');

const TimestampService = require('./timestamp');

// return only top level path and decode URI
const formatPath = (path) => decodeURI(path.substr(1, path.length - 1).split('/')[0]);

const reqHandler = (req, res) => {
    let query = formatPath(url.parse(req.url).pathname);
    let timestamp = new TimestampService().parse(query);
    res.write(JSON.stringify(timestamp));
    res.end();
};

const server = http.Server(reqHandler);

server.listen(3000, () => console.log('Server Running On Port: 3000'));
