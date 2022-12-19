
import { Request, Response } from 'express'
import * as yup from "yup"

import { handleRequest } from '../helper'
import userService from "../../db/models/user/user.service"

const signup = async (req: Request, res: Response) => {

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })

	const handle = async () => {
    const { email, password } = req.body

		return await userService.signup(email, password)
	}

	return handleRequest({ req, res, validationSchema, handle })
}

export default signup