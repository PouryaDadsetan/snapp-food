
import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import restaurantService from "../../db/models/restaurant/restaurant.service"

const verifyRestaurant = async (req: Request, res: Response) => {

	const handle = async () => {
    const currentAdminIsGodAdmin = res.locals.admin?.isGodAdmin
    const { restaurantId } = req.params 

		return await restaurantService.verifyRestaurant(currentAdminIsGodAdmin, restaurantId)
	}
  
	return handleRequest({ req, res, handle })
}

export default verifyRestaurant
