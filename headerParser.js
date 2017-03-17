module.exports = function headerParser(req) {
    return {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress,
        lang: req.headers['accept-language'].split(',')[0],
        os: /\(([^)]+)\)/.exec(req.headers['user-agent'])[1]
    }
}
