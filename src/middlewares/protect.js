import jwt from "jsonwebtoken";
import { User, BusinessOwner } from "../db/models";

export async function protect(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: "You are not authorized",
      });
    }
    const token = authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findOne({ where: { email: decoded.email } });
      if (!user) {
        return res.status(401).json({
          message: "You are not authorized",
        });
      }
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        message: "You are not authorized",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function protectOwner(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        message: "You are not authorized",
      });
    }
    const token = authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await BusinessOwner.findOne({
        where: { email: decoded.email },
      });
      if (!user) {
        return res.status(401).json({
          message: "You are not authorized",
        });
      }
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({
        message: "You are not authorized",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
