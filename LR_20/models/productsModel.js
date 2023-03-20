class productsModel {
  getProduct(conn) {
    return conn.products.findMany();
  }

  getOneProduct(conn, manufacturerName) {
    return conn.products.findMany({
      where: {
        product_name: manufacturerName,
      },
    });
  }

  getOneProductById(conn, manufacturerId) {
    return conn.products.findMany({
      where: {
        product_id: manufacturerId,
      },
    });
  }

  addProduct(conn, manufacturerObj) {
    let result = conn.products.create({
      data: {
        product_name: manufacturerObj.product_name,
        manufacturer_id: parseInt(manufacturerObj.manufacturer_id),
        category_id: parseInt(manufacturerObj.category_id),
      },
    });
    return result;
  }

  updateProduct(conn, manufacturerObj) {
    let result = conn.products.update({
      data: {
        product_name: manufacturerObj.product_name,
        manufacturer_id: parseInt(manufacturerObj.manufacturer_id),
        category_id: parseInt(manufacturerObj.category_id),
      },
      where: { product_id: parseInt(manufacturerObj.product_id) },
    });
    return result;
  }

  deleteProduct(conn, manufacturerId) {
    let result = conn.products.delete({
      where: { product_id: manufacturerId },
    });
    return result;
  }
}

module.exports = productsModel;
