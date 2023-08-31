import jwt from 'jsonwebtoken'
import User from '../models/users.model.js'
import encrypt from '../../config/bcrypt.js'
import config from '../../config/config.env.js'
const {passHashing, validatePass } =encrypt
const { SECRET, ADMIN_NAME, ADMIN_MAIL, ADMIN_PASS, ADMIN_ROLL } = config

let adminUser = {
    userName: ADMIN_NAME,
    userMail: ADMIN_MAIL,
    userPassword: ADMIN_PASS,
    userRoll: ADMIN_ROLL
}

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
            }else throw new Error('El usuario ya existe en la base de datos')
        }
    }catch(err) {
        console.log('No se pudo crear el usuario con mongoose ' + err)
    }
}

const authLoginService = async (user) => {
    let {userMail, userPassword} = user
    let foundUser = {}
    let isValidPass = false
    try {
        if(userMail === ADMIN_MAIL && userPassword === ADMIN_PASS) {
            foundUser = adminUser
            isValidPass = true
        }else {
            foundUser = await User.find({userMail: userMail})
            isValidPass = validatePass(userPassword, foundUser[0].userPassword)
        }
        if(foundUser.length > 0) {
            if(isValidPass) {
                req.session.userMail = foundUser[0].userMail
                req.session.userName = foundUser[0].userName
                req.session.lastName = foundUser[0].lastName || ' '
                req.session.userRoll = foundUser[0].userRoll
                let token = jwt.sign({email: userMail, password: userPassword},
                    SECRET,
                    {expiresIn:'24h'})
                return token
            } else throw new Error('El usuario no es valido')
        }else throw new Error('El usuario no se encuentra registrado')
        
    }catch(err) {
        console.log('No se pudo confirmar el usuario con mongoose ' + err)
    }
}

export default {
    authRegistrationService,
    authLoginService
}