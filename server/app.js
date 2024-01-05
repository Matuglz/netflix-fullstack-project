import express from 'express'
import cors from 'cors'
import { apiUsers } from './routers/users/apiUsers.js'
import { passportInitialize, passportSession } from "./middlewares/authentication.js"
import { sessions } from './middlewares/sessions.js'
import { membershipRouter } from './routers/membershipRouters/membershipRouter.js'
import { fetchUserPictures } from './routers/awsRouters/fetchUserPictures.js'
import { config as configDotenv } from "dotenv";
configDotenv()

const app = express()
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,  
}))

app.use(express.json())
app.use(sessions)
app.use(passportInitialize, passportSession)
const port = process.env.PORT || 8080
app.use(apiUsers)
app.use('/api', membershipRouter)
app.use(fetchUserPictures)

app.get('/', async (req, res) => {
  try {
    const user = req.user
    if (user) {
      console.log(user);
      return res.status(201).json({ status:'success',message: 'have session', user:user })
    }else {
      return res.status(404).json({status:'error', message: 'dont have session' })
    }
  } catch (error){
    return res.status(500).json({status:'error',message:'server internal error'})
  }
})

app.listen(port, () => {
  console.log(`servidor iniciado en el puerto ${port}`);
})