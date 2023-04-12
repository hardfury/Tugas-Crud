import express from "express";
import cors from "cors"
import db from "./config/database.js";
import userRouter from "./router/user.js"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

dotenv.config()
const app = express()
const port = process.env.SERVER_PORT
const corsOptions = {
    origin: true,
    credential: true
}
db.authenticate()
try {
    console.log("database connected")
} catch (error) {
    console.log("database connected failed")
}

(async()=> {
    await db.sync();
})();

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/api/user", userRouter)
app.listen(port,() => {
    console.log("server berjalan di port:", port)
})