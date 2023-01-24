import * as yup from 'yup'
import { Request, Response } from 'express'

import { handleRequest } from '../helper'
import orderService from "../../db/models/order/order.service"

const getOrdersOfCurrentUser = async (req: Request, res: Response) => {

  const queryValidationSchema = yup.object().shape({
    limit: yup.string(),
    skip: yup.string(),
    sortBy: yup.string().oneOf(['totalSum', 'createdAt', 'updatedAt']),
    sortOrder: yup.string().oneOf(['asc', 'desc']),
    search: yup.string().oneOf(['preparing', 'delivering', 'delivered', 'canceled'])
  })
  
	const handle = async () => {
    const { limit, skip, sortBy, sortOrder, search } = req.query
    const userId = res.locals.user._id
    
    const options = {
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
      sortBy: sortBy?.toString(),
      sortOrder: sortOrder?.toString(),
      search: search?.toString()
    }

		return await orderService.getOrdersOfCurrentUser(userId, options)
	}

	return handleRequest({ req, res, queryValidationSchema, handle })
}

export default getOrdersOfCurrentUser
