import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import adminService from "../../db/models/admin/admin.service"

const getAdmin = async (req: Request, res: Response) => {

	const handle = async () => {
		const currentAdminIsGodAdmin = res.locals.admin?.isGodAdmin
    const { adminId } = req.params

		return await adminService.getAdmin(currentAdminIsGodAdmin, adminId)
	}

	return handleRequest({ req, res, handle })
}

export default getAdmin
