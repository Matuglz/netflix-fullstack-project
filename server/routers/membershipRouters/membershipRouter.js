import { Router } from "express"
import { membershipManager } from "../../db/db.js"

export const membershipRouter = Router()

membershipRouter.post('/createMembership', async (req, res) => {
    try {
        await membershipManager.create(req.body)
        res.status(201).json({ status: 'success', message: 'membership register successfully' })
    }
    catch (error) {
        res.status(401).json({ status: 'error', message: error.message })
    }

})

membershipRouter.get('/memberships', async (req, res) => {
    try {
        const memberships = await membershipManager.find().lean()
        console.log(memberships);
        res.status(200).json({ status: 'success', memberships: memberships })
    }
    catch (error){
        res.status(404).json({ error: 'error', message: error.message })
    }
})

