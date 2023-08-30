import authService from '../services/auth.service.js'
const {authRegistrationService} = authService

const authRegistrationController = async (req, res) => {
    let user = req.body
    try {
        await authRegistrationService(user)
        res.redirect('/')
        
    }catch(err) {
        console.log('No se pudo crear el usuario con el servicio ' + err)
    }
}

export default {
    authRegistrationController
}