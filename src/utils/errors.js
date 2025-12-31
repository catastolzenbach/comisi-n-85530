export const TIPOS_ERROR = {
    TIPO_DE_DATOS: 400, 
    ARGUMENTOS_INVALIDOS: 400, 
    AUTENTICACION: 401, 
    AUTORIZACION: 403, 
    NOT_FOUND: 404, 
    INTERNAL_SERVER_ERROR: 500
};

export class CustomError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.status = statusCode;
        this.name = 'CustomError';
    }
}

