const mongoose = require("mongoose")
const {DB_HOST, DB_PORT, DB_NAME} = require("../config");


mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
        useNewUrlParser: true
    })
    .then(() => console.log("Database connect success"))
    .catch(() => console.log("Database connect fail"))
