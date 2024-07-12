function errorHandler(err, req, res, next) {
    let status = err.status || 500
    let message = err.message || "Internal server error"

    switch (err.name){
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400
            message = err.errors.map(e => e.message)
            break;
        case "Invalid Input":
            status = 400
            message = "username/password is required"
            break;
        case "Invalid User":
            status = 401
            message = "username/password is invalid"
            break;
        case "Unauthenticated":
        case "JsonWebTokenError":
            status = 401
            message = "Unauthenticated"
            break;
        case "CuisineNotFound":
            status = 404
            message = "Channel not found"
            break;
        case "CategoryNotFound":
            status = 404
            message = "Category not found"
            break;
        case "Forbidden":
            status = 403
            message = "Forbidden"
            break;
    }
    res.status(status).json({message: message})
}



   
module.exports = errorHandler