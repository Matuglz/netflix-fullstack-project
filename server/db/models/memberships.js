import mongoose from "mongoose"
import { randomUUID } from 'node:crypto'


const collection = 'memberships'

const membershipsSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    refId: { type: Number, require: true },
    name: { type: String, require: true },
    price: { type: Number, require: true },
    videoQuality: { type: String, require: true },
    resolution: { type: String, require: true }
},
    {
        strict: 'throw',
        versionKey: false,
    })

export const membershipManager = mongoose.model(collection, membershipsSchema)