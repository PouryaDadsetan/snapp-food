
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"

const changePassword = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
  })

	const handle = async () => {
    const adminId = res.locals.admin?._id
    const { oldPassword, newPassword } = req.body

		return await adminService.changePassword(adminId, oldPassword, newPassword)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default changePassword
