"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ValidationError = exports.GeneralError = exports.AwsServiceError = exports.DatabaseError = void 0;
const response_enums_1 = require("../types/response.enums");
class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = response_enums_1.ResponseStatus.InternalServerError;
        this.name = "DatabaseError";
    }
}
exports.DatabaseError = DatabaseError;
class AwsServiceError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = response_enums_1.ResponseStatus.BadRequest;
        this.name = "AwsServiceError";
    }
}
exports.AwsServiceError = AwsServiceError;
class GeneralError extends Error {
    constructor(message, statusCode = response_enums_1.ResponseStatus.InternalServerError) {
        super(message);
        this.statusCode = statusCode;
        this.name = "GeneralError";
    }
}
exports.GeneralError = GeneralError;
class ValidationError extends Error {
    constructor(message, statusCode = response_enums_1.ResponseStatus.BadRequest) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = response_enums_1.ResponseStatus.NotFound;
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
