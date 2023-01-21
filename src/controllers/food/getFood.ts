import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import foodService from "../../db/models/food/food.service"

const getFood = async (req: Request, res: Response) => {

  const paramsValidationSchema = yup.object().shape({
    foodId: yup.string().length(24).required()
  })

	const handle = async () => {
    const { foodId } = req.params

		return await foodService.getFood(foodId)
	}

	return handleRequest({ req, res, handle, paramsValidationSchema })
}

export default getFood
