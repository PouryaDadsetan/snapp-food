import { Router } from 'express'

import { adminRouter } from '../controllers/admin'
import { userRouter } from '../controllers/user'
import { adminRestaurantRouter, userRestaurantRouter } from '../controllers/restaurant'

const mainRouter = Router()

mainRouter.use('/admin', adminRouter)
mainRouter.use('/user', userRouter)
mainRouter.use('/admin/restaurant', adminRestaurantRouter)
mainRouter.use('/user/restaurant', userRestaurantRouter)

export default mainRouter