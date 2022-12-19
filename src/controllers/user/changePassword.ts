
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const changePassword = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
  })

	const handle = async () => {
    const userId = res.locals.user?._id
    const { oldPassword, newPassword } = req.body

		return await userService.changePassword(userId, oldPassword, newPassword)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default changePassword
