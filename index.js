const http = require('http');
const url = require('url');

const TimestampService = require('./timestamp');

const PORT = process.env.PORT || 3000;

// return only top level path and decode URI
const formatPath = (path) => decodeURI(path.substr(1, path.length - 1).split('/')[0]);

const reqHandler = (req, res) => {
    let query = formatPath(url.parse(req.url).pathname);
    let timestamp = new TimestampService().parse(query);
    res.write(JSON.stringify(timestamp));
    res.end();
};

const server = http.Server(reqHandler);

server.listen(PORT, () => console.log('Server Running On Port: ' + PORT));
