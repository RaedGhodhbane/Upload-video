const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/users");
const authRouter = require("./routes/authentication");
const mediaRouter = require("./routes/media");
const ConnectDB = require("./config/db");
const path = require("path");
app.use(cors());
app.use(express.json());
// app.get("/", (req, res) => res.send("hello "));

//  database mongo

// config db
ConnectDB();

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/media", mediaRouter);

// set all files in public for read
app.use("/public", express.static(path.join(__dirname, "public")));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running in ${PORT}`));
