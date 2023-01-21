import { Request, Response } from 'express'
import * as yup from 'yup'

import { handleRequest } from '../helper'
import restaurantService from "../../db/models/restaurant/restaurant.service"

const deleteRestaurants = async (req: Request, res: Response) => {
  const currentAdminIsGodAdmin = res.locals.admin?.isGodAdmin

	const validationSchema = yup.object().shape({
    idList: yup.array().of(yup.string()).required()
  })

	const handle = async () => {
    const { idList } = req.body
		return await restaurantService.deleteRestaurants(currentAdminIsGodAdmin, idList)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default deleteRestaurants
