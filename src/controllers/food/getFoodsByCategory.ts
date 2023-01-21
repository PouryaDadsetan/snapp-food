import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import foodService from "../../db/models/food/food.service"

const getFoodsByCategory = async (req: Request, res: Response) => {

  const paramsValidationSchema = yup.object().shape({
    category: yup.string().required()
  })

  const queryValidationSchema = yup.object().shape({
    limit: yup.string(),
    skip: yup.string(),
    sortBy: yup.string().oneOf(["name", "price", "category", "createdAt", "updatedAt"]),
    sortOrder: yup.string().oneOf(['asc', 'desc']),
    search: yup.string(),
  })

	const handle = async () => {
    const { category } = req.params    
    const { limit, skip, sortBy, sortOrder, search } = req.query

    const options = {
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
      sortBy: sortBy?.toString(),
      sortOrder: sortOrder?.toString(),
      search: search?.toString()
    }

		return await foodService.getFoodsByCategory(category, options)
	}

	return handleRequest({ req, res, handle, queryValidationSchema, paramsValidationSchema })
}

export default getFoodsByCategory
