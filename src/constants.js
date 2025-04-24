import dotenv from "dotenv"
dotenv.config()


// ----------------------------------- Initilization of .env file -------------------------------------------

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
];

export const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            console.log(origin)
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    "Access-Control-Allow-Origin": "*",
    credentials: true, // Allow cookies/auth headers
    optionsSuccessStatus: 200, // Response for preflight requests
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'] // Allowed headers
};

export const envProvider = {
    PORT: process.env.PORT,
    DB_URI: process.env.DBURI,
}


// Models related constants in app

export const baseOptionsforDynamicOptions = {
    discriminatorKey: "optionstype",
    collection: "dynamicOptionsModel",
    timestamps: true
}
