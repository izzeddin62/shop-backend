import { Product, BusinessOwner } from "../db/models";

export async function createProduct(req, res) {
  try {
    const { name, price, description, quantity, category } = req.body;
    const { user } = req;
    const owner = await BusinessOwner.findOne({ where: { id: user.id } });
    const product = await owner.createProduct({
      name,
      price,
      description,
      quantity,
      category,
    });
    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export async function getAllBusinessWithProducts(req, res) {
  try {
    const businesses = await BusinessOwner.findAll({
      include: {
        model: Product,
      },
      exclude: ["password"],
    });
    return res.status(200).json({
      message: "Businesses retrieved successfully",
      businesses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
