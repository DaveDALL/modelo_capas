
const userRegistrationViewController = (req, res) => {
    res.render('register', {})
}

const userLoginController = (req, res) => {
    res.render('login', {})
}

const userLogoutController = (req, res) => {
    req.session.destroy (err => {
        if(err) res.send('Problemas con el logout!!')
        res.clearCookie('jwtCookie').redirect('/')
    })
}

const productViewController = (req, res) => {
    let {userName, lastName, userRoll} = req.session
    res.render('products', {name: userName, lastName: lastName, roll: userRoll})
}

const cartViewController = (req, res) => {
    res.render('cart', {})
}

export default {
    userRegistrationViewController,
    userLoginController,
    userLogoutController,
    productViewController,
    cartViewController
}