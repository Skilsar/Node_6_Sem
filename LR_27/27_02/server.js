const app = require("express")();
const fs = require("fs");
const bodyParser = require("body-parser");

const PORT = 3000;
const { ServerSign } = require("./serverSign");
const rs = fs.createReadStream("./files/file.txt");

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}/`);
});
app.use(bodyParser.json());

app.get("/", (req, res) => {
  try {
    ServerSign(rs, (signContext) => {
      console.log(signContext);
      res.json(signContext);
    });
  } catch (e) {
    res.status(409).json({ errorMessage: "Error" });
  }
});
