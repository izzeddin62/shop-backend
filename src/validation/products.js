import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().min(1).required(),
  price: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
  category: Joi.string().min(1).required(),
});

export async function validateProduct(req, res, next) {
  try {
    await productSchema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export const name = "products";
