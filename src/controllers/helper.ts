import { Request, Response } from "express"
import  yup from "yup"

import { statusCodes } from '../utils/constants'

export interface IResponse {
  success: boolean
  outputs?: object
  error?: {
    message: string
    statusCode: number
  }
}

interface IHandleRequestOptions {
  req: Request
  res: Response
  conversionSchema?: string[]
  validationSchema?: yup.AnyObjectSchema
  queryValidationSchema?: yup.AnyObjectSchema
  paramsValidationSchema?: yup.AnyObjectSchema
  handle: () => Promise<IResponse>
}

export async function handleRequest({ req, res, conversionSchema, validationSchema, handle, queryValidationSchema, paramsValidationSchema }: IHandleRequestOptions) {
  // For converting array type fields of form data
  if(conversionSchema) {
    conversionSchema.forEach((conversion) => {
      if(conversion in req.body) {
        req.body[conversion] = req.body[conversion].split(',') 
      }
    })
  }

  if(validationSchema) {
		try {
			validationSchema.validateSync(req.body)
		} catch(error) {
			res.status(statusCodes.ue).send({ message: (error as Error).message })
			return
		}
	}

	if(queryValidationSchema) {
		try {
			queryValidationSchema.validateSync(req.query)
		} catch(error) {
			res.status(statusCodes.ue).send({ message: (error as Error).message })
			return
		}
	}
	if(paramsValidationSchema) {
		try {
			paramsValidationSchema.validateSync(req.params)
		} catch(error) {
			res.status(statusCodes.ue).send({ message: (error as Error).message })
			return
		}
	}
	try {
		const result = await handle()
		if(!result.success) {
			res.status(result.error?.statusCode || statusCodes.ise).send({ message: result.error?.message })
			return
		} else {
			if(result.outputs) {
				res.status(statusCodes.ok).send(result.outputs)
			} else {
				res.sendStatus(statusCodes.ok)
			}
		}
	} catch(error) {
		console.error('Error in handling controller: ', error)
		res.sendStatus(statusCodes.ise)
		return
	}
}
