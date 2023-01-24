
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import orderService from "../../db/models/order/order.service"

const addOrder = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    foods: yup.array().of(yup.object({
      food: yup.string(),
      count: yup.number()
    })).required(),
    address: yup.string().required(),
    phoneToContact: yup.string().required()
  })

	const handle = async () => {
    const { foods, address, phoneToContact } = req.body
    const { restaurantId } = req.params
    const userId = res.locals.user._id 

    const newOrder = {
      restaurant: restaurantId,
      userId,
      foods,
      phoneToContact,
      address
    }

		return await orderService.addOrder(newOrder)
	}

	return handleRequest({ req, res, handle, validationSchema })
}

export default addOrder
