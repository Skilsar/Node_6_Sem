const crypto = require("crypto");

function ServerDH(len_a, g) {
  const dh = crypto.createDiffieHellman(len_a, g);
  //инициализация параметров для протокола Диффи-Хельмана
  const p = dh.getPrime(); //получаем простое число
  const gb = dh.getGenerator(); //генератор
  const k = dh.generateKeys(); //серкретный ключ

  this.getContext = () => {
    //кинем в контекст для обмена с клиентом
    return {
      p_hex: p.toString("hex"),
      g_hex: gb.toString("hex"),
      key_hex: k.toString("hex"),
    };
  };

  this.getSecret = (clientContext) => {
    //принимаем от клиента секретный ключ
    //для получения и использования общего секретного ключа
    const k = Buffer.from(clientContext.key_hex, "hex");
    return dh.computeSecret(k);
  };
}

module.exports.ServerDH = ServerDH;
