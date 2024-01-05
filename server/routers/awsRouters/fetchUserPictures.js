
import { Router } from "express";
import { getProfileUrl } from "../../functions/awsFunctions.js"

export const fetchUserPictures = Router()

fetchUserPictures.get('/userPictures', async (req, res) => {
    try {
        const images = await getProfileUrl()
        res.status(200).json({ status: 'success', images: images })
    } catch (error) {
        res.status(404).json({ status: 'error', mesage: error.message })
    }

})