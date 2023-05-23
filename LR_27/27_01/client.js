const axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");

const { ClientDH } = require("./clientDH");
let clientContext;

async function client() {
  try {
    //кидаем запрос что бы получить данные сервака
    const res1 = await axios.get("http://localhost:3000/");
    console.log("serverContext = ", res1.data);
    const clientDH = new ClientDH(res1.data);
    //передаем данные сервера что бы обработать данные
    const clientSecret = clientDH.getSecret(res1.data);
    //получаем данные клиента из контекста
    clientContext = clientDH.getContext();
    console.log("clientContext = ", clientContext);
    /*кидаем запрос на сервер и передаем туда клиентский контекст
    с данными что бы получить зашифрованный файл*/
    const res2 = await axios({
      method: "post",
      url: "http://localhost:3000/resource",
      data: {
        clientContext: clientContext,
      },
    });

    let text = res2.data.file.toString("utf8");
    //получили текст зашифровенного файла

    const decipher = crypto.createDecipher("aes256", clientSecret.toString());
    /*создаем на базе клиентского секретного ключа объяект crypto
    для декодирования с тем же алгоритмом*/

    /*Берем зашифрованный текст и объект для расшифровке на базе секретного
    ключа клиента (данные из hex получаем в utf-8) */
    /*
    update - частичная расшифровка данных
    final - полная расшифровка данных
    */
    const decrypted =
      decipher.update(text, "hex", "utf8") + decipher.final("utf8");
    console.log("decrypted = ", decrypted);
    fs.writeFileSync(`${__dirname}/files/client.txt`, decrypted);
  } catch (e) {
    console.error(e.message);
  }
}

client();
