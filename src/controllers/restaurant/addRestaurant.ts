
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import restaurantService from "../../db/models/restaurant/restaurant.service"

const addRestaurant = async (req: Request, res: Response) => {
  
  const conversionSchema = ['categories']

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    categories: yup.array().of(yup.string().required()).required(),
    registrationNumber: yup.string().required()
  })

	const handle = async () => {
    const { name, city, address, categories, registrationNumber } = req.body
    const adminId = res.locals.admin._id

    const newRestaurant = {
      name: name.trim(),
      city: city.trim(),
      address,
      image: req.file,
      categories,
      registrationNumber
    }

		return await restaurantService.addRestaurant(adminId, newRestaurant)
	}

	return handleRequest({ req, res, handle, conversionSchema, validationSchema })
}

export default addRestaurant
