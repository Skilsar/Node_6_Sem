class manufacturersModel {
  getManufacturer(conn) {
    return conn.manufacturers.findMany();
  }

  getOneManufacturer(conn, manufacturerName) {
    return conn.manufacturers.findMany({
      where: {
        manufacturer_name: manufacturerName,
      },
    });
  }

  getOneManufacturerById(conn, manufacturerId) {
    return conn.manufacturers.findMany({
      where: {
        manufacturer_id: manufacturerId,
      },
    });
  }

  addManufacturer(conn, manufacturerObj) {
    let result = conn.manufacturers.create({
      data: {
        manufacturer_name: manufacturerObj.manufacturer_name,
      },
    });
    return result;
  }

  updateManufacturer(conn, manufacturerObj) {
    let result = conn.manufacturers.update({
      data: {
        manufacturer_name: manufacturerObj.manufacturer_name,
      },
      where: { manufacturer_id: parseInt(manufacturerObj.manufacturer_id) },
    });
    return result;
  }

  deleteManufacturer(conn, manufacturerId) {
    let result = conn.manufacturers.delete({
      where: { manufacturer_id: manufacturerId },
    });
    return result;
  }
}

module.exports = manufacturersModel;
