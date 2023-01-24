import { Router } from 'express'

import { adminRouter } from '../controllers/admin'
import { userRouter } from '../controllers/user'
import { adminRestaurantRouter, userRestaurantRouter } from '../controllers/restaurant'
import { adminFoodRouter, userFoodRouter } from '../controllers/food'
import { adminOrderRouter, userOrderRouter } from '../controllers/order'

const mainRouter = Router()

mainRouter.use('/admin', adminRouter)
mainRouter.use('/user', userRouter)
mainRouter.use('/admin/restaurant', adminRestaurantRouter)
mainRouter.use('/user/restaurant', userRestaurantRouter)
mainRouter.use('/admin/food', adminFoodRouter)
mainRouter.use('/user/food', userFoodRouter)
mainRouter.use('/admin/order', adminOrderRouter)
mainRouter.use('/user/order', userOrderRouter)

export default mainRouter