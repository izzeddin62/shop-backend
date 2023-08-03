import Joi from "joi";

const userSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
});

const businessOwnerSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  shopName: Joi.string().min(2).required(),
});

export async function validateSignup(req, res, next) {
  try {
    await userSignupSchema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function validateBusinessOwnerSignup(req, res, next) {
  try {
    await businessOwnerSignupSchema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
