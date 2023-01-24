
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import orderService from "../../db/models/order/order.service"

const rateOrder = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    ratings: yup.array().of(yup.object({
      food: yup.string().required(),
      rating: yup.number().required()
    })).required()
  })

	const handle = async () => {
    const { orderId } = req.params
    const { ratings } = req.body
    const userId = res.locals.user._id

		return await orderService.rateOrder(orderId, userId, ratings)
	}

	return handleRequest({ req, res, handle, validationSchema })
}

export default rateOrder
