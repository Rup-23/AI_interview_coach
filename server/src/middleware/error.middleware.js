const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console only in development
    if (process.env.NODE_ENV !== "production") {
        console.error("ERROR => ", err);
    }

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = `Resource not found`;
        error = { message, statusCode: 404 };
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = `Duplicate field value entered`;
        error = { message, statusCode: 400 };
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = { message, statusCode: 400 };
    }

    // JWT errors
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid token. Please log in again.";
        error = { message, statusCode: 401 };
    }

    if (err.name === "TokenExpiredError") {
        const message = "Your token has expired. Please log in again.";
        error = { message, statusCode: 401 };
    }

    return res.status(error.statusCode || err.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
};

export default errorHandler;