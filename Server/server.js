const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Connection = require("./database/connection");
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
  });
});

app.use(express.json());
const authRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
app.use("/", authRouter);
app.use("/products", productRouter);
Connection();
