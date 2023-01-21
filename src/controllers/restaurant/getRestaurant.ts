import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import restaurantService from "../../db/models/restaurant/restaurant.service"

const getRestaurant = async (req: Request, res: Response) => {

	const handle = async () => {
    const { restaurantId } = req.params
		return await restaurantService.getRestaurant(restaurantId)
	}

	return handleRequest({ req, res, handle })
}

export default getRestaurant
