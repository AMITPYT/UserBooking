const express = require("express");
require("./db");
const Admin = require("./Routers/admin");
const User = require("./Routers/user");
const Booking = require("./Routers/booking")

const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());


app.use(Admin, User, Booking)



app.listen(port, () => {
    console.log(`connection is setup at localhost:${port}`)
})