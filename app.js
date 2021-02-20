const express = require("express");
const productRouter = require("./routes/products_routes");
const discountRouter = require("./routes/discounts_routes")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/shop", productRouter);
app.use("/shop", discountRouter);

app.listen(PORT, () => console.log("Server is working ... "));