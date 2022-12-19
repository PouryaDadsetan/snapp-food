import jwt from "jsonwebtoken"
import { ObjectId as objectId } from "mongoose"
import config from "../../config"

export const generateToken = (id: objectId, role: 'user' | 'admin'): string => {
  const token = jwt.sign(
    { 
      id: id.toString(),
      role
    },
    config.jwtSecret,
    { expiresIn: "7d" }
  )

  return token
}