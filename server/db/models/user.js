import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto'
import { hashPassword, isValidPwd } from '../../functions/bcryptFunctions.js';
import { profileManager } from './profle.js';

const collection = 'users'

function validateEmail(email) {
    const re = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    return re.test(email)
}

const userSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    email: {
         type: String, 
         required: 'Email is required', 
         unique: true,
        lowercase:true,
        validate: [validateEmail, 'Email not valid' ]
     },
    password: { type: String, required: true },
    profiles: { type: Array, default: [] },
    membership: { type: Number, required: true }

},
    {
        strict: 'throw',
        versionKey: false,
        statics: {
            register: async function (body) {
                try {
                    const email = body.email
                    const exist = await mongoose.model(collection).findOne({ email })
                    if (exist) {
                        throw new Error('El correo ya esta registrado!')
                    }
                    body.password = hashPassword(body.password)
                    await mongoose.model(collection).create(body)
                    const defaultProfile = {
                        email: body.email,
                        name: 'Tu',
                        image: 'https://cacaaaaaaaaaaaaaaa.s3.sa-east-1.amazonaws.com/userPictures/clasico1.png',
                        kids: false
                    }
                    const profile = await profileManager.createProfile(defaultProfile)
                    await mongoose.model(collection).updateOne({ email }, { $push: { profiles: profile } })
                } catch (error) {
                    throw error
                }
            },
            login: async function (email, password) {
                const findUser = await mongoose.model(collection).findOne({ email }).lean()
                if (!findUser) {
                    throw new Error('Email incorrecto')
                }

                const pwd = isValidPwd(password, findUser)
                if (!pwd) {
                    throw new Error('Contraseña incorrecta')
                }
                const user = {
                    email: findUser.email,
                    profiles: findUser.profiles,
                    membership: findUser.membership,
                    rol: 'user'
                }
                return user
            }



        }
    })

export const userManager = mongoose.model(collection, userSchema)
