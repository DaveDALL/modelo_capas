import passport from 'passport'
import { Strategy as gitHubStrategy } from 'passport-github2'
import User from '../scr/models/users.model.js'
import config from './config.env.js'
const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = config

const initializePassportGit = () => {
    passport.use(
        'gitHubAuth',
        new gitHubStrategy(
            {
                clientID: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                callbackURL: CALLBACK_URL
            }, async (accessToken, refreshToken, profile, done) => {
                try {
                if(profile._json.email) {
                    let foundUser = await User.findOne({userMail: profile._json.email})
                    console.log(foundUser)
                    if(!foundUser) {
                        let fullName = profile._json.name.split(' ')
                        let createdUser = await User.create({
                            userName: fullName[0],
                            lastName: fullName[1] || ' ',
                            userMail: profile._json.email,
                            userPassword: '',
                            userCart: [],
                            userRoll: 'usuario'
                        })
                        return done(null, createdUser)
                    } else return done(null, foundUser)
                } else throw new Error('El usuario no cuenta con Email público')
                }catch(err) {
                    return done(null, err)
                }
            }))}

export default initializePassportGit




 