import mongoose from "mongoose"
import { randomUUID } from 'node:crypto'
import { userManager } from "./user.js"


const collection = 'profile'

const profileSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    image: { type: String, required: true },
    name: { type: String, required: true },
    kids: { type: Boolean, default: false }
},
    {
        strict: 'throw',
        versionKey: false,
        statics: {
            createProfile: async function (body) {
                try {
                    const user = await userManager.findOne({ email: body.email }).lean()
                    if (user.profiles.length === 4) {
                        throw new Error(`You can't have more than 4 profiles`)
                    }
                    const profile = await mongoose.model(collection).create({ image: String(body.image), name: body.name, kids: body.kids })
                    await userManager.updateOne({ email: body.email }, { $push: { profiles: profile } })
                } catch (error) {
                    throw new Error(error.message)
                }
            }
        }
    })


export const profileManager = mongoose.model(collection, profileSchema)