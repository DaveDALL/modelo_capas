import dotenv from 'dotenv'
import __dirname from './utils.js'

dotenv.config({
    path: `${__dirname}/../.env.develop`
})

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    SECRET: process.env.SECRET,
    ADMIN_NAME: process.env.ADMIN_NAME,
    ADMIN_MAIL: process.env.ADMIN_MAIL,
    ADMIN_PASS: process.env.ADMIN_PASS,
    ADMIN_ROLL: process.env.ADMIN_ROLL
}