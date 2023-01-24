
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import orderService from "../../db/models/order/order.service"

const updateOrderState = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    newState: yup.string().oneOf(['delivering', 'delivered', 'canceled']).required()
  })

	const handle = async () => {
    const { orderId } = req.params
    const { newState } = req.body
    const adminId = res.locals.admin._id

		return await orderService.updateOrderState(orderId, adminId, newState)
	}

	return handleRequest({ req, res, handle, validationSchema })
}

export default updateOrderState
