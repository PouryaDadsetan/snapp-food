
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import commentService from "../../db/models/comment/comment.service"

const addComment = async (req: Request, res: Response) => {
  const paramsValidationSchema = yup.object().shape({
    foodId: yup.string().length(24).required()
  })

  const validationSchema = yup.object().shape({
    message: yup.string().required()
  })

	const handle = async () => {
		const userId = res.locals.user?._id
    const { foodId } = req.params
    const { message } = req.body

    const newComment = {
      userId,
      foodId,
      message: message.trim()
    }

		return await commentService.addComment(newComment)
	}

	return handleRequest({ req, res, validationSchema, paramsValidationSchema, handle })
}

export default addComment
