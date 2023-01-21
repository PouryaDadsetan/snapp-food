import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import foodService from "../../db/models/food/food.service"
import { categories } from '../../utils/constants'

const editFood = async (req: Request, res: Response) => {

  const paramsValidationSchema = yup.object().shape({
    foodId: yup.string().length(24).required()
  })

  const validationSchema = yup.object().shape({
    name: yup.string(),
    ingredients: yup.string(),
    category: yup.string().oneOf(categories),
    price: yup.number().min(0),
    discountPercentage: yup.number().min(0).max(100),
  })

	const handle = async () => {
    const adminId = res.locals.admin._id
    const foodId = req.params.foodId

    if(req.file) {
      req.body.image = req.file
    }

    const allowedUpdates = ["name", "ingredients", "image", "category", "price", "discountPercentage"]

    const foodUpdates: { [key: string]: any} = {}

    Object.keys(req.body || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        foodUpdates[update] = req.body[update]
      }
    })

		return await foodService.editFood(adminId, foodId, foodUpdates)
	}

	return handleRequest({ req, res, validationSchema, paramsValidationSchema, handle })
}

export default editFood
