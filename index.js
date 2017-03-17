const http = require('http');
const url = require('url');

const TimestampService = require('./timestamp');
const headerParser = require('./headerParser');

const PORT = process.env.PORT || 3000;

// return only desired level path and decode URI
const formatPath = (path) => decodeURI(path.substr(1, path.length - 1).split('/')[0]);

const reqHandler = (req, res) => {
    if (req.url === '/') {
        const html = `<a href="/timestamp?time=${Date.now()}">Timestamp Microservice</a><br /><a href="/headers">Header Parser</a>`;
        res.setHeader('Content-Type', 'text/html');
        res.write(html);
        res.end();
    } else {
        let pathname = url.parse(req.url).pathname;
        if (pathname === '/timestamp') {
            let query = url.parse(req.url, true).query;
            let timestamp = new TimestampService().parse(query.time);
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(timestamp));
            res.end();
        } else if (pathname === '/headers') {
            let resObject = headerParser(req);
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(resObject));
            res.end();
        } else {
            res.writeHead(301, { 'Location': '/' });
            res.end();
        }
    }
};

const server = http.Server(reqHandler);

server.listen(PORT, () => console.log('Server Running On Port: ' + PORT));
