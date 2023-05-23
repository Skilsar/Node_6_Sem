const crypto = require("crypto");

function ClientDH(serverContext) {
  //берем данные от сервака и если они есть то все ок
  const ctx = {
    p_hex: serverContext.p_hex ? serverContext.p_hex : "1111",
    g_hex: serverContext.g_hex ? serverContext.g_hex : "1",
  };

  const p = Buffer.from(ctx.p_hex, "hex"); //преобразуем простое число из буфера
  const g = Buffer.from(ctx.g_hex, "hex"); //тоже самое для выбранного юзером числа
  const dh = crypto.createDiffieHellman(p, g); //создаем протокол диффи-хельмана с данными пользователя
  const k = dh.generateKeys(); //генерим клиентский ключ

  this.getContext = () => {
    //кидаем все в контекст
    return {
      p_hex: p.toString("hex"),
      g_hex: g.toString("hex"),
      key_hex: k.toString("hex"),
    };
  };

  this.getSecret = (serverContext) => {
    //получаем серкретный ключ и генерим общий секретный ключ
    const k = Buffer.from(serverContext.key_hex, "hex");
    return dh.computeSecret(k);
  };
}

module.exports.ClientDH = ClientDH;
