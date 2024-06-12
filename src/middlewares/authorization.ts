import jwt, { VerifyErrors } from "jsonwebtoken"
import { User } from "../models/User"
import { Request, Response, NextFunction } from "express"

const authorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract the JWT token from the request headers or wherever it's sent
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Authorization token not provided" })
  }

  // Verify the JWT token
  jwt.verify(
    token,
    "your_jwt_secret",
    (err: VerifyErrors | null, decodedToken: any) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" })
      } else {
        // Token is valid, you can extract user information from decodedToken
        // Check if the user exists in the database and has necessary permissions
        User.findById(decodedToken.userId)
          .then((user: any) => {
            if (!user) {
              return res.status(401).json({ error: "User not found" })
            }

            // Check if the user has necessary permissions to access the resource
            // For example, you might have roles or permissions stored in the user object
            // Here you would implement your authorization logic based on user roles or permissions

            // If the user is authorized, you can attach user information to the request for further processing
            ;(req as any).user = user
            next() // Call next middleware
          })
          .catch((err) => {
            console.error("Error finding user:", err)
            return res.status(500).json({ error: "Internal server error" })
          })
      }
    }
  )
}

export default authorizationMiddleware
