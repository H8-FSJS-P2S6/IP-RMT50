function errorHandler(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message || `Internal Server Error`

    switch (err.name) {
        case `SequelizeValidationError`:
            status = 400
            message = err.errors[0].message
            break;
        case `email req`:
            status = 401
            message = `Email is required`
            break;
        case `pass req`:
            status = 401
            message = `Password is required`
            break;
        case `email false`:
            status = 401
            message = `Email is wrong`
            break;
        case `pass false`:
            status = 401
            message = `Password is wrong`
            break;
        case `Unauthenticated`:
        case `JsonWebTokenError`:
            status = 404
            message = `Unauthenticated`
            break;
    }
    res.status(status).json({ message: message })
}

module.exports = errorHandler