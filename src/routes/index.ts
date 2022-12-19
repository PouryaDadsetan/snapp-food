import { Router } from 'express'

import { adminRouter } from '../controllers/admin'
import { userRouter } from '../controllers/user'

const mainRouter = Router()

mainRouter.use('/admin', adminRouter)
mainRouter.use('/user', userRouter)

export default mainRouter