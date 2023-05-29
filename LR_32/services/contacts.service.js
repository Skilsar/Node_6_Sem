const fs = require("fs");
const uuid = require("uuid");
const contacts = require("../data/contacts.json") || [];

const getAllContacts = async () => await contacts;

const getContact = async (id) => {
  const contact = await contacts.find((c) => c.id === id);
  return contact ? contact : "Not found";
};

const addContact = async (data) => {
  contacts.push({ id: uuid.v4(), name: data.name, phone: data.phone });
  saveToFile();

  return contacts[contacts.length - 1];
};

const editContact = async (data) => {
  const contact = await contacts.find((c) => c.id === data.id);
  if (contact) {
    contact.name = data.name;
    contact.phone = data.phone;
  }
  saveToFile();

  return contact;
};

const deleteContact = async (id) => {
  const index = await contacts.findIndex((c) => c.id === id);
  if (index === -1) {
    throw Error(`Element with id "${id}" doesn't exist`);
  }
  console.log(index);
  if (index !== -1) {
    contacts.splice(index, 1);
  }
  saveToFile();
  console.log("contacts service log:");
  console.log(await JSON.stringify(contacts));
  return contacts;
};

module.exports = {
  getAllContacts,
  getContact,
  addContact,
  editContact,
  deleteContact,
};

function saveToFile() {
  fs.writeFile("./data/contacts.json", JSON.stringify(contacts), (err) => {
    if (err) {
      console.error(err.message);
    }
  });
}
