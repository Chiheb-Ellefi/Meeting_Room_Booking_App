//express-async-errors : package used to handle errors that occur within asynchronous route handlers or middleware functions.
require("express-async-errors");
require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const cors = require("cors");
const connectDB = require("../config/database/connect_database");
const authRouter = require("./routes/authentication");
const userRouter = require("./routes/user");
const roomRouter = require("./routes/room");
const reservationRouter = require("./routes/reservation");
const reportRouter = require("./routes/report");
const dashboardRouter = require("./routes/dashboard");
const errorHandler = require("./middlewares/error_handler");
const notFoundMiddleware = require("./middlewares/not_found");
const getReservationsOfToday = require("./custom_modules/reservation/scheduler");
const {
    checkForReservations,
} = require("./custom_modules/reservation/current_reservation_checker");

const { Server } = require("socket.io");
const http = require("http");
//create an express app
const app = express();
//create a http server arround the express app
const httpServer = http.Server(app);
const io = new Server(httpServer);
const port = process.env.PORT || 3000;
//middlewares
//parse the incoming json requests and populate the req.body object with the parsed data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v2/auth", authRouter);
app.use(
    "/api/v2",
    userRouter,
    roomRouter,
    reservationRouter,
    reportRouter,
    dashboardRouter
);
app.use(errorHandler);
app.use(notFoundMiddleware);

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("updated", (arg1) => {
        console.log(arg1);
    });
    roomStatusUpdate = ({ roomId, booked, res_id }) => {
        console.log(roomId, { booked });
        io.emit("updateRoom", roomId, { booked, res_id });
    };
    setInterval(async() => {
        checkForReservations(roomStatusUpdate);
        console.log("executed once");
    }, 10000);
});

const start = async() => {
    await connectDB();
    httpServer.listen(port, console.log(`Server is listening on port ${port}`));
    console.log("Before scheduling cron job");
    cron.schedule("0 0 * * *", async() => {
        getReservationsOfToday();
    });

    console.log("After scheduling cron job");
};
start();