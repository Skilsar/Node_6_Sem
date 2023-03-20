const express = require("express");
const parser = require("body-parser");
const methodOverride = require("method-override");

const customerRouter = require("./routes/customerRouter");
const storeRouter = require("./routes/storeRouter");
const categoryRouter = require("./routes/categoryRouter");
const htmlRouter = require("./routes/htmlRoutes");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

app.use(methodOverride("_method"));

app.set("view engine", "hbs");
app.use(parser.json());

app.use(parser.urlencoded({ extended: false }));

app.use("/customer", customerRouter);
app.use("/store", storeRouter);
app.use("/category", categoryRouter);

app.use("/html", htmlRouter, () => {
  console.log(1111);
});

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});
