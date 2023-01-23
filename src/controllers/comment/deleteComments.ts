
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import commentService from "../../db/models/comment/comment.service"

const deleteComments = async (req: Request, res: Response) => {
  const validationSchema = yup.object().shape({
    idList: yup.array().of(yup.string().length(24)).required()
  })

	const handle = async () => {
		const userId = res.locals.user?._id
    const { idList } = req.body

		return await commentService.deleteComments(userId, idList)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default deleteComments
