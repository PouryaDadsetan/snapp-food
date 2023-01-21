
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import foodService from "../../db/models/food/food.service"
import { ObjectId  as objectId } from 'mongoose'
import { categories } from '../../utils/constants'

const addFood = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    ingredients: yup.string().required(),
    category: yup.string().oneOf(categories).required(),
    price: yup.number().min(0).required(),
    discountPercentage: yup.number().min(0).max(100).required(),
  })

	const handle = async () => {
		const adminId = res.locals.admin?._id
    
    const { name, ingredients, category, price, discountPercentage } = req.body

    const newFood = {
      name: name.trim(),
      ingredients: ingredients.trim(),
      category: category.trim(),
      image: req.file,
      price,
      discountPercentage
    }

		return await foodService.addFood(adminId, newFood)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default addFood
