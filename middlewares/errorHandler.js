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
            status = 401
            message = `Unauthenticated`
            break;
        case `Party Full`:
            status = 400
            message = `Your party is full`
            break;
        case `Team Full`:
            status = 400
            message = `Your team can only have 4 Character`
            break;
        case `delete 404`:
            status = 404
            message = `Party with id ${err.id} not found`
            break;
        case `cannot delete`:
            status = 400
            message = `Cannot delete party that has teams`
            break;
        case `404`:
            status = 404
            message = `Weapon with id ${err.id} not found`
            break;
            case `TeamNotFound`:
            status = 404
            message = `Team with id ${err.id} not found`
            break;
        case `Forbidden`:
            status = 404
            message = `You are not authorized`
            break;
    }
    res.status(status).json({ message: message })
}

module.exports = errorHandler