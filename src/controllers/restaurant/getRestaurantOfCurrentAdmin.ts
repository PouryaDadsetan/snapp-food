import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import restaurantService from "../../db/models/restaurant/restaurant.service"

const getRestaurantOfCurrentAdmin = async (req: Request, res: Response) => {

	const handle = async () => {
    const adminId = res.locals.admin._id
		return await restaurantService.getRestaurantOfCurrentAdmin(adminId)
	}

	return handleRequest({ req, res, handle })
}

export default getRestaurantOfCurrentAdmin
