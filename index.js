const http = require('http');
const url = require('url');

const TimestampService = require('./timestamp');

const PORT = process.env.PORT || 3000;

// return only desired level path and decode URI
const formatPath = (path) => decodeURI(path.substr(1, path.length - 1).split('/')[0]);

// return client ip address
const ipAddress = (req) => req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

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
            const ip = ipAddress(req);
            const resObject = {
                ip,
                lang: req.headers['accept-language'].split(',')[0],
                os: /\(([^)]+)\)/.exec(req.headers['user-agent'])[1]
            }
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(resObject));
            res.end();
        } else {
            res.writeHead(301, { 'Location': '/' });
            res.end();
        }
    }

    // console.log(req.headers);
    // let query = formatPath(url.parse(req.url).pathname);
    // let timestamp = new TimestampService().parse(query);
    // res.write(JSON.stringify(timestamp));
    // res.end();
};

const server = http.Server(reqHandler);

server.listen(PORT, () => console.log('Server Running On Port: ' + PORT));
