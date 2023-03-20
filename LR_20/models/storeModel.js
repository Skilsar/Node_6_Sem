class storeModel {
  getStore(conn) {
    return conn.stores.findMany();
  }

  getOneStore(conn, storeName) {
    return conn.stores.findMany({
      where: {
        store_name: storeName,
      },
    });
  }

  getOneStoreById(conn, storeId) {
    return conn.stores.findMany({
      where: {
        store_id: storeId,
      },
    });
  }

  addStore(conn, storeObj) {
    let result = conn.stores.create({
      data: {
        store_name: storeObj.store_name,
        store_city: storeObj.store_city,
      },
    });
    return result;
  }

  updateStore(conn, storeObj) {
    let result = conn.stores.update({
      data: {
        store_name: storeObj.store_name,
        store_city: storeObj.store_city,
      },
      where: { store_id: parseInt(storeObj.store_id) },
    });
    return result;
  }

  deleteStore(conn, storeId) {
    let result = conn.stores.delete({ where: { store_id: storeId } });
    return result;
  }
}

module.exports = storeModel;
