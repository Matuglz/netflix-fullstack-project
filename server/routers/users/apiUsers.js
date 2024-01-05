import { Router } from "express"
import { loginRouter } from "./loginRouter.js"
import { singUpRouter } from "./singUpRouter.js"
import { checkRouter } from "./checkRouter.js"
import { profilesRouter } from "./profiles.js"



export const apiUsers = Router()

apiUsers.use('/', loginRouter)
apiUsers.use('/', singUpRouter)
apiUsers.use('/api', checkRouter)
apiUsers.use('/', profilesRouter)