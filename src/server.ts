import bodyParser from "body-parser";
import express from "express";
import { orderRoutes } from "./handlers/orderHandler";
import productRoutes from "./handlers/productHandler";
import userRoutes from "./handlers/userhandler";

const PORT: number =  process.env.PORT as unknown as number || 5050;
export const app: express.Application = express();

app.use(bodyParser.json());
productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.use(function (req, res) {
  res.status(404);
  res.send("Page not found");
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED AT http://localhost:${PORT}, MAKE FIREWORKS 🚀🚀`);
});
