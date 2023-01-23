import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import commentService from "../../db/models/comment/comment.service"

const editComment = async (req: Request, res: Response) => {
  const paramsValidationSchema = yup.object().shape({
    commentId: yup.string().length(24).required()
  })

  const validationSchema = yup.object().shape({
    message: yup.string().required()
  })

	const handle = async () => {
    const userId = res.locals.user._id
    const commentId = req.params.commentId

    const allowedUpdates = ["message"]

    const commentUpdates: { [key: string]: any} = {}

    Object.keys(req.body || {}).forEach((update) => {
      if(allowedUpdates.includes(update)) {
        commentUpdates[update] = req.body[update].trim()
      }
    })

		return await commentService.editComment(userId, commentId, commentUpdates)
	}

	return handleRequest({ req, res, validationSchema, paramsValidationSchema, handle })
}

export default editComment
