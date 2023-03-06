module.exports = {
  async gets(model, conn) {
    switch (model) {
      case "faculties":
        return conn.FACULTY.findMany();
      case "pulpits":
        return conn.PULPIT.findMany();
      case "teachers":
        return conn.TEACHER.findMany();
      case "subjects":
        return conn.SUBJECT.findMany();
      case "auditoriumstypes":
        return conn.AUDITORIUM_TYPE.findMany();
      case "auditoriums":
        return conn.AUDITORIUM.findMany();
      default:
        return "Table not found";
        break;
    }
  },
  getAuditoriumsgt60(model) {
    console.log(model);
    return model.scope("auditoriumsgt60").findAll({});
  },
  getPulByFac(conn, faculty_name) {
    return conn.FACULTY.findMany({
      where: {
        FACULTY: faculty_name,
      },
      select: {
        FACULTY: true,
        PULPIT_PULPIT_FACULTYToFACULTY: {
          select: {
            PULPIT: true,
            SUBJECT_SUBJECT_PULPITToPULPIT: {
              select: {
                SUBJECT_NAME: true,
              },
            },
          },
        },
      },
    });
  },
  getAuditoriumByType(conn, auditoriums) {
    return conn.AUDITORIUM_TYPE.findMany({
      where: {
        AUDITORIUM_TYPE: auditoriums,
      },
      select: {
        AUDITORIUM_TYPE: true,
        AUDITORIUM_AUDITORIUM_AUDITORIUM_TYPEToAUDITORIUM_TYPE: {
          select: {
            AUDITORIUM: true,
          },
        },
      },
    });
  },
  auditoriumsWithComp1(conn) {
    return conn.AUDITORIUM.findMany({
      where: {
        AUDITORIUM: {
          contains: "-1",
        },
        AUDITORIUM_TYPE: "LH",
      },
    });
  },
  puplitsWithoutTeachers(conn) {
    return conn.PULPIT.findMany({
      where: {
        TEACHER_TEACHER_PULPITToPULPIT: {
          none: {},
        },
      },
    });
  },
  pulpitsWithVladimir(conn) {
    return conn.PULPIT.findMany({
      where: {
        TEACHER_TEACHER_PULPITToPULPIT: {
          some: {
            TEACHER_NAME: {
              contains: "Vladimir",
            },
          },
        },
      },
    });
  },
  fluentapi(conn) {
    return conn.PULPIT.findUnique({
      where: { PULPIT: "ISIT" },
    }).SUBJECT_SUBJECT_PULPITToPULPIT();
  },
  transactions(conn) {
    conn.AUDITORIUM.updateMany({
      data: {
        AUDITORIUM_CAPACITY: {
          increment: 100,
        },
      },
    }).then(() => {
      const audit = conn.AUDITORIUM.findMany();
      console.log("-commit", r);
      setTimeout(() => {
        conn.$queryRaw("ROLLBACK");
        console.log("---rollback");
      }, 2000);
      return audit;
    });
  },
  pulpitshtml(conn) {
    return conn.PULPIT.findMany({
      include: {
        _count: {
          select: { TEACHER_TEACHER_PULPITToPULPIT: true },
        },
      },
    });
  },
  auditoriumsSameCount(conn) {
    return conn.AUDITORIUM.groupBy({
      by: ["AUDITORIUM_TYPE", "AUDITORIUM_CAPACITY"],
      _count: {
        AUDITORIUM: true,
      },
    });
  },
  async inserting(model, object, conn) {
    let result = null;
    switch (model) {
      case "faculties":
        await conn.FACULTY.create({
          data: {
            FACULTY: object.faculty,
            FACULTY_NAME: object.faculty_name,
            PULPIT_PULPIT_FACULTYToFACULTY: {
              create: object.pulpit,
            },
          },
          include: { PULPIT_PULPIT_FACULTYToFACULTY: true },
        })
          .then((res) => {
            result = res;
          })
          .catch((err) => {
            result = { error: "Insert error:" + err };
          });

        return result;
      case "pulpits":
        await conn.PULPIT.create({
          data: {
            PULPIT: object.PULPIT,
            PULPIT_NAME: object.PULPIT_NAME,
            FACULTY_PULPIT_FACULTYToFACULTY: {
              connectOrCreate: {
                where: {
                  FACULTY: object.FACULTY,
                },
                create: {
                  FACULTY: object.FACULTY,
                  FACULTY_NAME: object.FACULTY_NAME,
                },
              },
            },
          },
        })
          .then((res) => {
            result = res;
          })
          .catch((err) => {
            result = { error: "Insert error:" + err };
          });
        return result;
      case "teachers":
        await conn.TEACHER.create({
          data: {
            TEACHER: object.TEACHER,
            TEACHER_NAME: object.TEACHER_NAME,
            PULPIT_TEACHER_PULPITToPULPIT: {
              connect: { PULPIT: object.PULPIT },
            },
          },
        })
          .then((res) => {
            result = res;
          })
          .catch((err) => {
            result = { error: "Insert error:" + err };
          });
        return result;
      case "subjects":
        await conn.SUBJECT.create({
          data: {
            SUBJECT: object.SUBJECT,
            SUBJECT_NAME: object.SUBJECT_NAME,
            PULPIT_SUBJECT_PULPITToPULPIT: {
              connect: { PULPIT: object.PULPIT },
            },
          },
        })
          .then((res) => {
            result = res;
          })
          .catch((err) => {
            result = { error: "Insert error:" + err };
          });
        return result;
      case "auditoriumstypes":
        await conn.AUDITORIUM_TYPE.create({
          data: {
            AUDITORIUM_TYPE: object.AUDITORIUM_TYPE,
            AUDITORIUM_TYPENAME: object.AUDITORIUM_TYPENAME,
          },
        })
          .then((res) => {
            result = res;
          })
          .catch((err) => {
            result = { error: "Insert error:" + err };
          });
        return result;
      case "auditoriums":
        await conn.AUDITORIUM.create({
          data: {
            AUDITORIUM: object.AUDITORIUM,
            AUDITORIUM_NAME: object.AUDITORIUM_NAME,
            AUDITORIUM_CAPACITY: object.AUDITORIUM_CAPACITY,
            AUDITORIUM_TYPE_AUDITORIUM_AUDITORIUM_TYPEToAUDITORIUM_TYPE: {
              connect: { AUDITORIUM_TYPE: object.AUDITORIUM_TYPE },
            },
          },
        })
          .then((res) => {
            result = res;
          })
          .catch((err) => {
            result = { error: "Insert error:" + err };
          });
        return result;
      default:
        return "Inserted error";
        break;
    }
  },
  async updating(conn, object, naming) {
    let result = null;
    switch (naming) {
      case "faculties":
        await conn.FACULTY.update({
          data: { FACULTY_NAME: object.FACULTY_NAME },
          where: { FACULTY: object.FACULTY },
        })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Update error:" + err };
          });
        return result;
      case "pulpits":
        await conn.PULPIT.update({
          data: { PULPIT_NAME: object.PULPIT_NAME, FACULTY: object.FACULTY },
          where: { PULPIT: object.PULPIT.trim() },
        })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Deleting error: " + err };
          });
        return result;
      case "teachers":
        await conn.TEACHER.update({
          data: { TEACHER_NAME: object.TEACHER_NAME, PULPIT: object.PULPIT },
          where: { TEACHER: object.TEACHER },
        })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Deleting error: " + err };
          });
        return result;
      case "subjects":
        await conn.SUBJECT.update({
          data: { SUBJECT_NAME: object.SUBJECT_NAME, PULPIT: object.PULPIT },
          where: { SUBJECT: object.SUBJECT },
        })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Deleting error: " + err };
          });
        return result;
      case "auditoriumstypes":
        await conn.AUDITORIUM_TYPE.update({
          data: { AUDITORIUM_TYPENAME: object.AUDITORIUM_TYPENAME },
          where: { AUDITORIUM_TYPE: object.AUDITORIUM_TYPE },
        })
          .then((res) => (result = res))
          .catch((err) => {
            result = { error: "Deleting error: " + err };
          });
        return result;
      case "auditorium":
        await conn.AUDITORIUM.update({
          data: {
            AUDITORIUM_NAME: object.AUDITORIUM_NAME,
            AUDITORIUM_CAPACITY: object.AUDITORIUM_CAPACITY,
            AUDITORIUM_TYPE: object.AUDITORIUM_TYPE,
          },
          where: { AUDITORIUM: object.AUDITORIUM },
        })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Deleting error: " + err };
          });
        return result;
      default:
        return "Updated Error";
        break;
    }
  },
  async deleting(conn, naming, nam) {
    let result = null;
    switch (naming) {
      case "faculties":
        await conn.FACULTY.delete({ where: { FACULTY: nam } })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Deleting error: " + err };
          });
        return result;
      case "pulpits":
        await conn.PULPIT.delete({ where: { PULPIT: nam } })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Deleting error: " + err };
          });
        return result;
      case "teachers":
        await conn.TEACHER.delete({ where: { TEACHER: nam } })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Deleting error: " + err };
          });
        return result;
      case "subjects":
        await conn.SUBJECT.delete({ where: { SUBJECT: nam } })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Deleting error: " + err };
          });
        return result;
      case "auditoriumstypes":
        await conn.AUDITORIUM_TYPE.delete({ where: { AUDITORIUM_TYPE: nam } })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Deleting error: " + err };
          });
        return result;
      case "auditoriums":
        await conn.AUDITORIUM.delete({ where: { AUDITORIUM: nam } })
          .then((task) => (result = task))
          .catch((err) => {
            result = { error: "Deleting error: " + err };
          });
        return result;
      default:
        return "Deleting error!";
    }
  },
};
