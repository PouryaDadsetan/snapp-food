import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import foodService from "../../db/models/food/food.service"

const getFoodsOfCurrentAdmin = async (req: Request, res: Response) => {

	const handle = async () => {
    const adminId = res.locals.admin._id

		return await foodService.getFoodsOfCurrentAdmin(adminId)
	}

	return handleRequest({ req, res, handle })
}

export default getFoodsOfCurrentAdmin
