const axios = require("axios");
const fs = require("fs");

const { ClientVerify } = require("./clientVerify");
const rs = fs.createReadStream("./files/file.txt");

async function client() {
  try {
    const res = await axios.get("http://localhost:3000/");

    ClientVerify(res.data, rs, (result) => {
      result
        ? console.log("Signature verifyed = ", res.data)
        : console.log("Error");
    });
  } catch (e) {
    console.error(e.message);
  }
}

client();
