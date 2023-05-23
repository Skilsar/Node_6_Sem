const express = require("express");
const { engine } = require("express-handlebars");
const parser = require("body-parser");

const phoneRouter = require("./router/phoneRouter");

const port = 3000;
const app = express();

app.engine(
  "handlebars",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);
app.set("view engine", "handlebars");
app.use(parser.json());
app.use(express.static(__dirname + "/views"));

app.use("/", phoneRouter);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}/`);
});
