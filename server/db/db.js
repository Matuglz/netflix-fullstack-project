import mongoose from 'mongoose'
import { config as configDotEnv } from "dotenv";


configDotEnv()

mongoose.connect(process.env.MONGODB_ACCESS_STRING)

export { userManager } from './models/user.js';
export { membershipManager } from './models/memberships.js'
export { profileManager } from './models/profle.js'