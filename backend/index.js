import app from "./app.js";
import connectDB from "./src/db/connectDB.js";
import userRoutes from "./src/routes/user.route.js";
const PORT = process.env.PORT;

connectDB();

app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
