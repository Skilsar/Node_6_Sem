const contactService = require("../services/contacts.service");

module.exports = {
  async getAllContacts(req, res) {
    const contacts = await contactService.getAllContacts();
    res.type("json");
    res.end(JSON.stringify(contacts));
  },

  async addContact(req, res) {
    if (req.body.name && req.body.phone) {
      const contact = await contactService.addContact(req.body);
      res.type("json");
      res.end(JSON.stringify(contact));
    } else {
      res.status(400).end("Parameters not found");
    }
  },

  async editContact(req, res) {
    if (req.body.id && req.body.name && req.body.phone) {
      const contact = await contactService.editContact(req.body);
      res.type("json");
      res.end(JSON.stringify(contact));
    } else {
      res.status(400).end("Parameters not found");
    }
  },

  async deleteContact(req, res) {
    try {
      if (req.query.id) {
        console.log(req.query.id);
        const contacts = await contactService.deleteContact(req.query.id);
        console.log("constacts log: ");
        console.log(await JSON.stringify(contacts));
        res.type("json");
        res.end(JSON.stringify(contacts));
      } else {
        res.status(400).end("Parameters not found");
      }
    } catch (error) {
      console.log(error.toString());
      res.type("json");
      res
        .status(400)
        .end(JSON.stringify({ "Error message": error.toString().substr(7) }));
    }
  },
};
