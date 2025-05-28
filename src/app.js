import express, { urlencoded } from "express";
import cors from "cors";
import { corsOptions } from "./constants.js";
import Errorhandler from "./utils/APIErrorHandler.js";
import MainRoute from "./routes/main.route.js"
import cookieParser from "cookie-parser";
const app = express()
app.use(express.json({limit:"16kb"}))
app.use(urlencoded({extended:true}))
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', req.headers.origin); // Allow dynamic origin
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, withCredentials');
//     next();
// });


app.use(cookieParser());


// Api Route
app.use("/api/v1", MainRoute)

app.get("/", (request, response)=>{
    response.status(200).send("APi is working fine")
})
// for middleware error handling
app.use(Errorhandler)


export {app}
