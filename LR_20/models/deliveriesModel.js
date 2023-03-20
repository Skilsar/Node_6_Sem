class deliveriesModel {
  getDelivery(conn) {
    return conn.deliveries.findMany();
  }

  getOneDeliveryById(conn, deliveryId) {
    return conn.deliveries.findMany({
      where: {
        deliveries_id: parseInt(deliveryId),
      },
    });
  }

  addDelivery(conn, deliveryObj) {
    let result = conn.deliveries.create({
      data: {
        product_id: parseInt(deliveryObj.product_id),
        store_id: parseInt(deliveryObj.store_id),
        delivery_date: new Date(deliveryObj.delivery_date),
        product_count: parseInt(deliveryObj.product_count),
      },
    });
    return result;
  }

  updateDelivery(conn, deliveryObj) {
    let result = conn.deliveries.update({
      data: {
        product_id: parseInt(deliveryObj.product_id),
        store_id: parseInt(deliveryObj.store_id),
        delivery_date: new Date(deliveryObj.delivery_date),
        product_count: parseInt(deliveryObj.product_count),
      },
      where: { deliveries_id: parseInt(deliveryObj.deliveries_id) },
    });
    return result;
  }

  deleteDelivery(conn, deliveryId) {
    let result = conn.deliveries.delete({
      where: { deliveries_id: deliveryId },
    });
    return result;
  }
}

module.exports = deliveriesModel;
