import express from "express";
import { startDB } from "./src/config/database.js";
import { userRouter } from "./src/routes/user.routes.js";
// import { Product } from "./src/models/product.model.js";

const app = express();
const PORT = 3001;

// para que entienda el formato json
app.use(express.json());

app.use("/api", userRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo http://localhost:${PORT}`);
});