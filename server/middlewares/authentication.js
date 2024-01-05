import passport from 'passport'
import { Strategy as localStrategy } from 'passport-local'
import { config as configDotenv } from "dotenv";
import { userManager } from '../db/db.js';
configDotenv()

passport.use('loginLocal', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
     session:true
}, async function verification(username, password, done) {
    try {
        const userData = await userManager.login(username, password)
        done(null, userData)
    }
    catch (error) {
        done(error)
    }
}))


passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()