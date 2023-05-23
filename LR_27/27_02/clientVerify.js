const crypto = require("crypto");

function ClientVerify(SignContext, rs, cb) {
  const v = crypto.createVerify("SHA256");
  rs.pipe(v);
  rs.on("end", () => {
    cb(v.verify(SignContext.publicKey, SignContext.signature, "hex"));
  });
}

module.exports.ClientVerify = ClientVerify;
