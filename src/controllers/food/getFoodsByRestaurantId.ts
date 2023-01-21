import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import foodService from "../../db/models/food/food.service"

const getFoodsByRestaurantId = async (req: Request, res: Response) => {

  const paramsValidationSchema = yup.object().shape({
    restaurantId: yup.string().length(24).required()
  })

	const handle = async () => {
    const { restaurantId } = req.params

		return await foodService.getFoodsByRestaurantId(restaurantId)
	}

	return handleRequest({ req, res, handle, paramsValidationSchema })
}

export default getFoodsByRestaurantId
