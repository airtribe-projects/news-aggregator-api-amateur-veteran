const httpErrorStatusCodes = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

class HttpError extends Error {
    statusCode: number;
    message: string;
    errors?: any;

    constructor(statusCode: number, message: string, errors?: any) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
}

export {
    HttpError,
    httpErrorStatusCodes,
}
