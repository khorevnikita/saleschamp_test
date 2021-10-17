require('dotenv').config()
module.exports = {
    url: process.env.MONGO_URL,
    database: process.env.DATABASE_NAME
};