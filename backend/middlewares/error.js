import { envMode } from "../server.js";

export const errorMiddleware = (err, req, res, next) => {
    // Default error message and status code
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    // Log the error message
    console.error(err.stack);

    // Handle MongoDB duplicate key errors
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern).join(", ");
        err.message = `Duplicate field - ${field}`;
        err.statusCode = 400;
    }

    if(err.name === "CastError"){
        const errorPath = err.path;
        err.message = `Invalid Format of ${errorPath}`;
        err.statusCode = 400;
    }

    const response = {
        success: false,
        message: err.message,
    };
    if(envMode === "DEVELOPMENT"){
        response.error = err;
    }

    // Respond with the error message and status code
    return res.status(err.statusCode).json(response);
};


export const TryCatch = (passedFunc) => async (req, res, next) => {
    try {
        await passedFunc(req, res, next);
    } catch (error) {
        next(error);
    }
};

const a = TryCatch()