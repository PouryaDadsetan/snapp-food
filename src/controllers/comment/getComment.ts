import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import commentService from "../../db/models/comment/comment.service"

const getComment = async (req: Request, res: Response) => {
  const paramsValidationSchema = yup.object().shape({
    commentId: yup.string().length(24).required()
  })

	const handle = async () => {
    const { commentId } = req.params

		return await commentService.getComment(commentId)
	}

	return handleRequest({ req, res, handle, paramsValidationSchema })
}

export default getComment
