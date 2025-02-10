import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDb from "./config/connectDb.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";

import path from 'path';
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";


dotenv.config();
connectDb();
const app = express();
const PORT = 4000;


dotenv.config({ path: path.resolve(".env") });

app.use(express.json());
const __dirname=path.resolve();


app.use(cors({
  origin: ['http://localhost:5174'], // Add any other allowed origins here

  
  credentials: true
}));




app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));
/////////

////////
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
app.listen(PORT, () => {
  console.log(`App is Listening to the Port ${PORT}`);
});


