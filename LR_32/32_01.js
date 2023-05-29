const express = require("express");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs");
const path = require("path");

const app = express();
const port = 3000;

// Загрузка файла документации
const swaggerDocument = yaml.load(path.join(__dirname, "./doc/api.yaml"));
const contactRouter = require("./routers/contacts.router");

app
  .use(express.json())
  // Добавляем по маршруту /docs определённый контроллер (по /docs будет отображаться документация)
  .use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
  .use(bodyParser.json())
  .use("/ts", contactRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}/doc`);
});
