export default class BaseMiddleware {
    static checkContentType(req, res, next) {
        const contype = req.headers['content-type'];
        if (!contype || contype.indexOf('application/json') !== 0) {
            return res.send(415);
        }
        next();
    }
}