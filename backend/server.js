import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import "dotenv/config.js";

import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

connectDB();
const app = express();
const PORT = 4000;

app.use(express.json());


app.use(cors({
  origin: ['http://localhost:5173'], // Add any other allowed origins here

  
  credentials: true
}));




app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));
/////////

////////

app.listen(PORT, () => {
  console.log(`App is Listening to the Port ${PORT}`);
});
