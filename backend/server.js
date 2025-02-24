import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import connectDb from "./config/connectDb.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import job from "./crons/cron.js";

dotenv.config();
connectDb();
job.start();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const __dirname = path.resolve();

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5174", "https://food-rush-7571.onrender.com"], // Allow local & deployed frontend
    credentials: true, // Allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization", "token"], // Include 'token' header
  })
);

// Explicitly handle preflight requests
app.options("*", cors());


// Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
