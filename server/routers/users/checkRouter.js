import { Router } from "express";
import { userManager } from "../../db/db.js"

export const checkRouter = Router()

checkRouter.post('/checkEmail', async (req, res) => {
    console.log('recibido');
    try {
        const email = req.body.email
        const user = await userManager.findOne({ email }).lean()
        if (!user) {
            res.status(201).json({ status: 'success', message: 'email available' })
        } else {
            res.status(401).json({ status: 'error', message: 'email not available' })

        }
    } catch {
        console.log('error',error);
    }
})