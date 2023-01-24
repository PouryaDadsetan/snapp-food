import * as yup from 'yup'
import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import restaurantService from "../../db/models/restaurant/restaurant.service"

const getRestaurantsByCity = async (req: Request, res: Response) => {

  const queryValidationSchema = yup.object().shape({
    limit: yup.string(),
    skip: yup.string(),
    sortBy: yup.string().oneOf(['rating', 'createdAt', 'updatedAt']),
    sortOrder: yup.string().oneOf(['asc', 'desc']),
    search: yup.string()
  })
  
	const handle = async () => {
    const { limit, skip, sortBy, sortOrder, search } = req.query
    const { city } = req.params
    
    const options = {
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
      sortBy: sortBy?.toString(),
      sortOrder: sortOrder?.toString(),
      search: search?.toString()
    }

		return await restaurantService.getRestaurantsByCity(city, options)
	}

	return handleRequest({ req, res, queryValidationSchema, handle })
}

export default getRestaurantsByCity
