import Router from "express"
import { userManager } from "../../db/db.js"
export const singUpRouter = Router()


singUpRouter.post('/singUp', async (req, res) => {
    try {
        const user=  await userManager.register(req.body)
        res.status(201).json({ status: 'success', message: 'usuario creado' })

    }
    catch (error) {
        res.status(401).json({ status: 'error', message: error.message })
    }
})

