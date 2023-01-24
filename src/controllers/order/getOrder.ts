import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import orderService from "../../db/models/order/order.service"

const getOrder = async (req: Request, res: Response) => {

	const handle = async () => {
    const { orderId } = req.params
    const ownerId = res.locals.admin?._id || res.locals.user?._id
		return await orderService.getOrder(orderId, ownerId)
	}

	return handleRequest({ req, res, handle })
}

export default getOrder
