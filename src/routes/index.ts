import { Router } from 'express'

import { panelAdminRouter } from '../controllers/admin'
import { websiteUserRouter } from '../controllers/user'

const mainRouter = Router()

mainRouter.use('/panel/admin', panelAdminRouter)
mainRouter.use('/website/user', websiteUserRouter)

export default mainRouter