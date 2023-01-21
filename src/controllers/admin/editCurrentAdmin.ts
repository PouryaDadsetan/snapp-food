import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"

const editCurrentAdmin = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    email: yup.string().email(),
    phone: yup.string(),
    name: yup.string()
  })

	const handle = async () => {

    const adminId = res.locals.admin._id

    const allowedUpdates = ["email", "phone", "name"]

    const adminUpdates: { [key: string]: any} = {}

    Object.keys(req.body || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        adminUpdates[update] = req.body[update]
      }
    })

		return await adminService.editCurrentAdmin(adminId, adminUpdates)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default editCurrentAdmin
