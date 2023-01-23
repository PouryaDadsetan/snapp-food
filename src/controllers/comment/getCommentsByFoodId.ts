import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import commentService from "../../db/models/comment/comment.service"

const getCommentsByFoodId = async (req: Request, res: Response) => {

  const paramsValidationSchema = yup.object().shape({
    foodId: yup.string().length(24).required()
  })

  const queryValidationSchema = yup.object().shape({
    limit: yup.string(),
    skip: yup.string(),
    sortBy: yup.string().oneOf(["createdAt", "updatedAt"]),
    sortOrder: yup.string().oneOf(['asc', 'desc']),
    search: yup.string(),
  })

	const handle = async () => {
    const { foodId } = req.params    
    const { limit, skip, sortBy, sortOrder, search } = req.query

    const options = {
      limit: limit ? Number(limit) : undefined,
      skip: skip ? Number(skip) : undefined,
      sortBy: sortBy?.toString(),
      sortOrder: sortOrder?.toString(),
      search: search?.toString()
    }

		return await commentService.getCommentsByFoodId(foodId, options)
	}

	return handleRequest({ req, res, handle, queryValidationSchema, paramsValidationSchema })
}

export default getCommentsByFoodId
