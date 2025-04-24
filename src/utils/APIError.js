class APIError extends Error{
    constructor(statuscode, message){
        super(message);
        this.message = message,
        this.statuscode = statuscode
    }
}

export default APIError