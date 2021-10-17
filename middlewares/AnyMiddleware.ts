export default class AnyMiddleware {
    static anyMethod(req, res, next) {
        // do something
        console.log("INSIDE MIDDLEWARE")
        next()
    }
}
