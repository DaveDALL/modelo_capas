import authService from '../services/auth.service.js'
const {authRegistrationService, authLoginService} = authService

const authRegistrationController = async (req, res) => {
    let user = req.body
    try {
        await authRegistrationService(user)
        res.redirect('/')
        
    }catch(err) {
        console.log('No se pudo crear el usuario con el servicio ' + err)
    }
}

const authLoginController = async (req, res) => {
    let user = req.body
    try {
        let userInfo = await authLoginService(user)
        if(userInfo) {
            req.session.userMail = userInfo.foundUser[0].userMail
            req.session.userName = userInfo.foundUser[0].userName
            req.session.lastName = userInfo.foundUser[0].lastName || ' '
            req.session.userRoll = userInfo.foundUser[0].userRoll
            res.cookie('jwtCookie', userInfo.token).redirect('/products')
        }else res.redirect('/')
    }catch(err) {
        console.log('No se pudo confirmar el usuario con mongoose ' + err)
        res.redirect('/userRegistration')
    }
}

export default {
    authRegistrationController,
    authLoginController
}