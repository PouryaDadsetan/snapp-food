
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import restaurantService from "../../db/models/restaurant/restaurant.service"

const editRestaurant = async (req: Request, res: Response) => {
  
  const conversionSchema = ['categories']
  
  const validationSchema = yup.object().shape({
    name: yup.string(),
    city: yup.string(),
    address: yup.string(),
    categories: yup.array().of(yup.string()),
    registrationNumber: yup.string()
  })

	const handle = async () => {
    const adminId = res.locals.admin._id
    
    const allowedUpdates = [
      'name',
      'city',
      'address',
      'image',
      'categories',
      'registrationNumber'
    ]
    const updates: { [key: string]: any } = {}

    if(req.file) {
      req.body.image = req.file
    }
    Object.keys(req.body || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        if(['name', 'city'].includes(update)) {
          updates[update] = req.body[update].trim()
        } else {
          updates[update] = req.body[update]
        }
      }
    })

		return await restaurantService.editRestaurant(adminId, updates)
	}
  
	return handleRequest({ req, res, conversionSchema, validationSchema, handle })
}

export default editRestaurant
