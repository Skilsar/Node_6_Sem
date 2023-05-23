const fs = require("fs");
let base = require("./database") || [];
let upd = false;

module.exports = {
  getPhones: () => base,

  getPhoneById: (id) => base.find((phone) => phone.id === Number(id)),

  addPhone(fields) {
    const { fio, number } = fields;
    if (!fio || !number) {
      throw new Error("Empty fio or number fields");
    }
    const newPhone = {
      id: nextId(),
      fio,
      number,
    };
    base.push(newPhone);
    save();
    return newPhone;
  },

  updatePhone(fields) {
    const { id, fio, number } = fields;
    if (!id || !fio || !number) {
      throw new Error("Empty id, fullfio or phone fields");
    }
    let targetPhone = base.find((phone) => phone.id === Number(id));
    if (!targetPhone) {
      throw new Error("Invalid record id");
    }
    targetPhone.fio = fio;
    targetPhone.number = number;
    save();
    return targetPhone;
  },

  deletePhone(fields) {
    const { id, fio, number } = fields;
    let targetPhone = base.find((phone) => phone.id == Number(id));
    if (!targetPhone) {
      throw new Error("Invalid record id");
    }
    if (targetPhone.fio != fio || targetPhone.number != number) {
      return;
    }
    base = base.filter((phone) => phone.id !== Number(id));
    save();
    return targetPhone;
  },
};

function save() {
  fs.writeFile(
    __dirname + "/database.json",
    JSON.stringify(base, null, "  "),
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
}

function nextId() {
  return base[base.length - 1].id + 1;
}
