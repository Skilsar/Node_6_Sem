const app = require("express")();
const bodyParser = require("body-parser");
const fs = require("fs");
const crypto = require("crypto");
const { ServerDH } = require("./serverDH");
const PORT = 3000;

let serverDH, serverContext, serverSecret;

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}/`);
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  serverDH = new ServerDH(1024, 3); //создаем экземпляр класса
  serverContext = serverDH.getContext(); //берем контекст для получения данных
  console.log("serverContext = ", serverContext);
  res.json(serverContext); //отправляем клиенту данные
});

app.post("/resource", (req, res) => {
  let context = req.body.clientContext;
  if (context) {
    console.log("clientContext = ", context);
    serverSecret = serverDH.getSecret(context);
    //кидаем данные и получаем общий серкретный ключ
    const cipher = crypto.createCipher("aes256", serverSecret.toString());
    //создаем шифр который будем юзать для передачи
    const text = fs.readFileSync(`${__dirname}/files/server.txt`, {
      encoding: "utf8",
    });
    //достаем полученные данные
    const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
    //декодим данные
    console.log("encrypted = ", encrypted);

    res.json({ file: encrypted });
  } else {
    res.status(409).json({ errorMessage: "Error!" });
  }
});
