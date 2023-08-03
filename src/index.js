import express from "express";
import dotenv from "dotenv";
import usersRoutes from "./routes/users";
import productsRoutes from "./routes/products";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", usersRoutes);
app.use("/products", productsRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
