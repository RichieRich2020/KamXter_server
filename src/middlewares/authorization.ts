import jwt, { VerifyErrors } from "jsonwebtoken"
import { User } from "../models/User"
import { Request, Response, NextFunction } from "express"

const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if auth token cookie exists

  const token = req.cookies.testCookie
  console.log(req.cookies.testCookie)
  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" })
  }

  try {
    // Verify JWT token
    // const decoded :any = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key

    // Attach decoded payload to request object
    jwt.verify(token, "your_jwt_secret", (err: any, decoded: any) => {
      if (err) return res.sendStatus(403)
      req.body.user = decoded
      next()
    })
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

export default authorizationMiddleware
