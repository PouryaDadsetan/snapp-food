
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"
import { ObjectId  as objectId } from 'mongoose'

const addAdmin = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    phone: yup.string().required(),
    name: yup.string().required(),
  })

	const handle = async () => {
		const currentAdminIsGodAdmin = res.locals.admin?.isGodAdmin
    
    const { email, password, phone, name } = req.body

    const newAdmin = {
      email: email.trim(),
      password: password.trim(),
      phone: phone.trim(),
      name: name.trim()
    }

		return await adminService.addAdmin(currentAdminIsGodAdmin, newAdmin)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default addAdmin
