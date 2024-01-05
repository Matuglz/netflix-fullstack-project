import { Router } from "express";
import { profileManager } from "../../db/db.js";


export const profilesRouter = Router()

profilesRouter.post('/createProfile', async (req, res) => {
    try {
        await profileManager.createProfile(req.body)
        res.status(201).json({ status: 'success', message: 'profile successfully created' })
    } catch (error) {
        res.status(401).json({ status: 'error', message: error.message })
    }
})

profilesRouter.post('/selectedProfile', async (req, res) => {
    try {
        req.user.selectedProfile = req.body.profile
        res.status(201).json({ status: 'success', message: 'profile selected and saved in cookies' })
    } catch (error) {
        res.status(401).json({ status: 'error', message: error.message })
    }
})

profilesRouter.get('/selectedProfile', async(req,res)=>{
    try{
        const profile = req.user.selectedProfile
        res.status(201).json({status:'success', profile:profile})
    }catch(error){
        res.status(404).json({status:'error', message:error.message})
    }
})