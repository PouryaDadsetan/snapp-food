
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import foodService from "../../db/models/food/food.service"

const deleteFoods = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    idList: yup.array().of(yup.string().length(24)).required()
  })

	const handle = async () => {
		const adminId = res.locals.admin?._id
    const { idList } = req.body

		return await foodService.deleteFoods(adminId, idList)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default deleteFoods
