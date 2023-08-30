import jwt from 'jsonwebtoken'
import passport from 'passport'
import User from '../models/users.model.js'
import encrypt from '../../config/bcrypt.js'
const {passHashing, validatePass } =encrypt

const authRegistrationService = async (user) => {
    let {userName, lastName, userMail, userPassword} = user
    try {
        if(userName && lastName && userMail && userPassword) {
            let foundUser = await User.findOne({userMail: userMail})
            if(!foundUser) {
                let hashedPassword = passHashing(userPassword)
                let createdUser = await User.create({
                    userName,
                    lastName,
                    userMail,
                    userPassword: hashedPassword,
                    cartId: [],
                    userRoll: 'usuario'
                })
                return createdUser
            }else throw new Error('El usuario ya existe')
        }
    }catch(err) {
        console.log('No se pudo crear el usuario con mongoose ' + err)
    }
}

export default {
    authRegistrationService

}