import express from "express";
import { startDB } from "./src/config/database.js";
import dotenv from "dotenv";
import { userRouter } from "./src/routes/user.routes.js";
import { taskRouter } from "./src/routes/task.routes.js";
import { personRouter } from "./src/routes/person.routes.js";
import { roleRouter } from "./src/routes/role.routes.js";
// import { Product } from "./src/models/product.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// para que entienda el formato json
app.use(express.json());

app.use("/api", userRouter);
app.use("/api", taskRouter);
app.use("/api", personRouter);
app.use("/api", roleRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo http://localhost:${PORT}`);
});
