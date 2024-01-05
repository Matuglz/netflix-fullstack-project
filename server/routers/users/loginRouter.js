import { Router } from "express";
import passport from "passport";

export const loginRouter = Router()

loginRouter.post('/Login', passport.authenticate('loginLocal', { failWithError: true }),
    async (req, res, next) => {
        res.status(204).json({ status: 'success', message: 'login success' })
    },
    (error, req, res, next) => {
        res.status(401).json({ status: 'success', message: error.message })
    }
)