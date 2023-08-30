import mongoose from 'mongoose'
import config from '../../config/config.env.js'
const { MONGO_URL } = config

export default {
    connect: async () => {
        return await mongoose.connect(MONGO_URL, {}).then(connection => {
            console.log('DataBase connection succesful!!')
        }).catch(err => console.log('Problema con la conexión a la base de datos ' + err))
    }
}
