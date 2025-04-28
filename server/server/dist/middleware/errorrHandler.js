"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const errors_1 = require("../utils/errors");
const response_enums_1 = require("../types/response.enums");
const errorHandler = (error, request, response, next) => {
    console.log('in error', error);
    let statusCode = response_enums_1.ResponseStatus.InternalServerError;
    let message = response_enums_1.ResponseMessages.InternalServerError;
    if (error instanceof zod_1.ZodError) {
        console.log(error, 'error');
        return response.status(response_enums_1.ResponseStatus.BadRequest).json({
            success: false,
            message: "Invalid data",
            errors: error.errors,
        });
    }
    else if (error instanceof errors_1.AwsServiceError ||
        error instanceof errors_1.ValidationError ||
        error instanceof errors_1.DatabaseError ||
        error instanceof errors_1.GeneralError ||
        error instanceof errors_1.NotFoundError) {
        statusCode = error.statusCode;
        message = error.message;
    }
    else {
        message = error.message || message;
    }
    return response.status(statusCode).json({
        success: false,
        message,
    });
};
exports.default = errorHandler;
