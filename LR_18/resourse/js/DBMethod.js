const { Sequelize } = require("sequelize");

module.exports = {
  //Get methods
  gets(Model) {
    return Model.findAll({
      raw: true,
    });
  },
  getAuditoriumsgt60(Model) {
    console.log(Model);
    return Model.findAll({
      where: {
        auditorium_capacity: {
          [Sequelize.Op.and]: {
            [Sequelize.Op.gt]: 10,
            [Sequelize.Op.lt]: 60,
          },
        },
      },
    });
  },
  getPulByFac(Faculty1, Pulpit1, Subject, faculty_name) {
    return Faculty1.findAll({
      include: [
        {
          model: Pulpit1,
          Subject,
          as: "faculty_pulpits",
          required: true,
          where: { faculty: faculty_name },
        },
      ],
    });
  },
  getAuditoriumByType(Auditorium, Auditorium_type, auditoriums) {
    return Auditorium.findAll({
      include: [
        {
          model: Auditorium_type,
          as: "auditorium_type_auditorium",
          required: true,
          where: { auditorium_type: auditoriums },
        },
      ],
    });
  },

  //Post methods
  async insertObj(model, obj) {
    let result = null;
    await model
      .create(obj)
      .then((res) => {
        result = res;
      })
      .catch((err) => {
        result = { error: "Insert error:" + err };
      });
    return result;
  },

  //Put method
  async updateObj(table, model, obj) {
    let result = null;
    switch (table) {
      case "faculties":
        await model
          .update(
            { faculty_name: obj.faculty_name },
            { where: { faculty: obj.faculty } }
          )
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Update error:" + err };
          });
        break;
      case "pulpits":
        await model
          .update(
            { pulpit_name: obj.pulpit_name, faculty: obj.faculty },
            { where: { pulpit: obj.pulpit.trim() } }
          )
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Delete error:" + err };
          });
        break;
      case "teachers":
        await model
          .update(
            { teacher_name: obj.teacher_name, pulpit: obj.pulpit },
            { where: { teacher: obj.teacher } }
          )
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Delete error:" + err };
          });
        break;
      case "subjects":
        await model
          .update(
            { subject_name: obj.subject_name, pulpit: obj.pulpit },
            { where: { subject: obj.subject } }
          )
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Delete error:" + err };
          });
        break;
      case "auditoriumstypes":
        await model
          .update(
            { auditorium_typename: obj.auditorium_typename },
            { where: { auditorium_type: obj.auditorium_type } }
          )
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Delete error:" + err };
          });
        break;
      case "auditoriums":
        await model
          .update(
            {
              auditorium_name: obj.auditorium_name,
              auditorium_capacity: obj.auditorium_capacity,
              auditorium_type: obj.auditorium_type,
            },
            { where: { auditorium: obj.auditorium } }
          )
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Delete error:" + err };
          });
        break;
      default:
        return "Not found";
    }
    if (result != 0) return obj;
    else return { Error: "Object isn't found!" };
  },

  async deleting(model, naming, nam) {
    let result = null;
    console.log(nam, naming);
    switch (naming) {
      case "faculties":
        await model
          .destroy({ where: { faculty: nam } })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Delete error:" + err };
          });
        break;
      case "pulpits":
        await model
          .destroy({ where: { pulpit: nam } })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Delete error:" + err };
          });
        break;
      case "teachers":
        await model
          .destroy({ where: { teacher: nam } })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Delete error:" + err };
          });
        break;
      case "subjects":
        await model
          .destroy({ where: { subject: nam } })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Delete error:" + err };
          });
        break;
      case "auditoriumstypes":
        await model
          .destroy({ where: { auditorium_type: nam } })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Delete error:" + err };
          });
        break;
      case "auditoriums":
        await model
          .destroy({ where: { auditorium: nam } })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Delete error:" + err };
          });
        break;
      default:
        return "Plocho";
        break;
    }
  },
};
